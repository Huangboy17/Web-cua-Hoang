import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db, isUserAdmin, auth } from '../firebase';
import { VisitorLog, VisitorEvent } from '../types';

const VISITOR_ID_KEY = 'HOANG_KTXD_VISITOR_UUID_V1';
const SESSION_ID_KEY = 'HOANG_KTXD_SESSION_UUID_V1';

// Generate or retrieve persistent visitor UUID
function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return 'v_' + Math.random().toString(36).substring(2, 9);
  }
}

// Generate or retrieve session UUID
function getOrCreateSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = 's_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return 's_' + Math.random().toString(36).substring(2, 9);
  }
}

// Extract campaign & ref tags from query parameters
function getCampaignParams() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || urlParams.get('source') || undefined;
    const utmMedium = urlParams.get('utm_medium') || undefined;
    const utmCampaign = urlParams.get('utm_campaign') || undefined;
    const refTag = urlParams.get('ref') || urlParams.get('from') || urlParams.get('recruiter') || undefined;
    return { utmSource, utmMedium, utmCampaign, refTag };
  } catch {
    return {};
  }
}

// Helper to detect Device, OS, Browser, Screen and Connection
function getEnvironmentDetails() {
  const ua = navigator.userAgent;
  
  // Device
  let device: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    device = 'Mobile';
  }

  // OS
  let os = 'Unknown OS';
  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows NT 6.3/i.test(ua)) os = 'Windows 8.1';
  else if (/Windows NT 6.1/i.test(ua)) os = 'Windows 7';
  else if (/iPhone/i.test(ua)) os = 'iOS (iPhone)';
  else if (/iPad/i.test(ua)) os = 'iPadOS';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // Browser & Version
  let browser = 'Unknown Browser';
  let browserVersion = '';
  if (/Edg\/([0-9.]+)/i.test(ua)) {
    browser = 'Microsoft Edge';
    browserVersion = RegExp.$1;
  } else if (/Chrome\/([0-9.]+)/i.test(ua) && !/Chromium|Edg/i.test(ua)) {
    browser = 'Google Chrome';
    browserVersion = RegExp.$1;
  } else if (/Safari\/([0-9.]+)/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua)) {
    browser = 'Safari';
    browserVersion = RegExp.$1;
  } else if (/Firefox\/([0-9.]+)/i.test(ua)) {
    browser = 'Firefox';
    browserVersion = RegExp.$1;
  } else if (/OPR\/([0-9.]+)/i.test(ua) || /Opera/i.test(ua)) {
    browser = 'Opera';
  } else if (/MSIE|Trident/i.test(ua)) {
    browser = 'Internet Explorer';
  } else if (/Zalo/i.test(ua)) {
    browser = 'Zalo In-App Browser';
  } else if (/FBAN|FBAV/i.test(ua)) {
    browser = 'Facebook In-App Browser';
  }

  const screenResolution = `${window.screen?.width || window.innerWidth}x${window.screen?.height || window.innerHeight}`;
  const windowSize = `${window.innerWidth}x${window.innerHeight}`;

  // Network connection type (if supported by browser)
  const navConn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const connectionType = navConn?.effectiveType || navConn?.type || 'Online';

  // Referrer parsing
  let referrer = document.referrer;
  const campaign = getCampaignParams();
  
  if (campaign.refTag) {
    referrer = `Mã Ref/Ứng Tuyển: [${campaign.refTag}]`;
  } else if (campaign.utmSource) {
    referrer = `Chiến Dịch: [${campaign.utmSource}]`;
  } else if (!referrer || referrer === '') {
    referrer = 'Direct (Truy cập trực tiếp / Bookmark)';
  } else {
    try {
      const url = new URL(referrer);
      if (url.hostname === window.location.hostname) {
        referrer = 'Internal (Chuyển trang nội bộ)';
      } else if (url.hostname.includes('google.')) {
        referrer = 'Google Search';
      } else if (url.hostname.includes('linkedin.')) {
        referrer = 'LinkedIn';
      } else if (url.hostname.includes('facebook.') || url.hostname.includes('fb.')) {
        referrer = 'Facebook';
      } else if (url.hostname.includes('topcv.')) {
        referrer = 'TopCV.vn';
      } else if (url.hostname.includes('vietnamworks.')) {
        referrer = 'VietnamWorks';
      } else if (url.hostname.includes('itviec.')) {
        referrer = 'ITviec';
      } else if (url.hostname.includes('github.')) {
        referrer = 'GitHub';
      } else if (url.hostname.includes('zalo.')) {
        referrer = 'Zalo Chat/Post';
      } else {
        referrer = url.hostname;
      }
    } catch {
      referrer = document.referrer.slice(0, 80);
    }
  }

  return { device, os, browser, browserVersion, screenResolution, windowSize, referrer, connectionType };
}

// IP & Geolocation & ISP fetcher with multiple fallback mechanisms
async function fetchGeoLocation(): Promise<{ 
  ip?: string; 
  city?: string; 
  region?: string; 
  country?: string; 
  countryCode?: string;
  isp?: string;
  org?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}> {
  // Try ipwho.is first (Very rich data: ISP, Org, Lat/Lng, Timezone)
  try {
    const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
          countryCode: data.country_code,
          isp: data.connection?.isp || data.connection?.org || 'Nhà mạng Viễn thông',
          org: data.connection?.org || data.connection?.isp,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone?.id || 'Asia/Ho_Chi_Minh'
        };
      }
    }
  } catch (e) {
    // Ignore and fallback
  }

  // Fallback 1: ipapi.co
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        countryCode: data.country_code,
        isp: data.org || data.asn || 'Mạng Internet',
        org: data.org,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone || 'Asia/Ho_Chi_Minh'
      };
    }
  } catch (e) {
    // Ignore and fallback
  }

  // Fallback 2: api.country.is
  try {
    const res = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      return {
        ip: data.ip,
        country: data.country,
        countryCode: data.country,
        city: 'Việt Nam',
        isp: 'Internet Provider'
      };
    }
  } catch (e) {
    // Default fallback
  }

  return {
    city: 'Hà Nội',
    region: 'Hà Nội',
    country: 'Việt Nam',
    countryCode: 'VN',
    isp: 'Mạng Viễn Thông VN',
    timezone: 'Asia/Ho_Chi_Minh'
  };
}

let currentSessionDocId: string | null = null;
let currentEvents: VisitorEvent[] = [];
let currentVisitedProjects: string[] = [];
let maxScrollDepth = 0;
let sessionStartTime = Date.now();
let isInitialized = false;

// Compute Lead Score dynamically based on interactions and dwell time
export function computeLeadScore(durationSeconds: number, events: VisitorEvent[], scrollDepth: number): 'hot' | 'warm' | 'new' | 'casual' {
  const hasHighIntentAction = events.some(ev => 
    ev.type.includes('demo') || 
    ev.type.includes('cv') || 
    ev.type.includes('contact') || 
    ev.type.includes('download') ||
    ev.type.includes('copy')
  );

  if (hasHighIntentAction || durationSeconds >= 75) {
    return 'hot';
  }
  if (durationSeconds >= 25 || scrollDepth >= 50 || events.length >= 3) {
    return 'warm';
  }
  if (durationSeconds < 15 && events.length <= 1 && scrollDepth < 30) {
    return 'casual';
  }
  return 'new';
}

/**
 * Calculate accurate scroll depth percentage based on lowest visible point in viewport
 */
export function calculateAccurateScrollDepth(): number {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0;
  try {
    const docEl = document.documentElement;
    const body = document.body;

    const scrollTop = Math.max(
      window.scrollY || 0,
      window.pageYOffset || 0,
      docEl?.scrollTop || 0,
      body?.scrollTop || 0
    );

    const scrollHeight = Math.max(
      docEl?.scrollHeight || 0,
      body?.scrollHeight || 0,
      docEl?.offsetHeight || 0,
      body?.offsetHeight || 0,
      docEl?.clientHeight || 0,
      body?.clientHeight || 0
    );

    const clientHeight = window.innerHeight || docEl?.clientHeight || body?.clientHeight || 800;

    const scrollableDistance = scrollHeight - clientHeight;
    if (scrollHeight <= 0 || scrollableDistance <= 10) {
      return 100; // Entire content fits in viewport
    }

    // Standard Visibility Metric: lowest point of content currently or previously visible
    const visibleBottom = scrollTop + clientHeight;
    const readPercentage = Math.min(100, Math.max(10, Math.round((visibleBottom / scrollHeight) * 100)));

    return readPercentage;
  } catch {
    return 15;
  }
}

let scrollDebounceTimer: any = null;

// Throttled sync to Firestore
async function syncSessionToFirestore() {
  if (!currentSessionDocId) return;
  try {
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    const score = computeLeadScore(duration, currentEvents, maxScrollDepth);
    const ref = doc(db, 'visitor_logs', currentSessionDocId);
    await updateDoc(ref, {
      durationSeconds: duration,
      scrollDepth: maxScrollDepth,
      leadScore: score,
      lastActive: new Date().toISOString(),
      events: currentEvents,
      visitedProjects: currentVisitedProjects
    });
  } catch (err) {
    // Non-blocking
  }
}

/**
 * Initialize visitor tracking on app load
 */
export async function initVisitorTracking(initialLanguage: string = 'vi', initialTheme: 'dark' | 'light' = 'dark'): Promise<void> {
  if (isInitialized) return;
  isInitialized = true;

  try {
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const env = getEnvironmentDetails();
    const campaign = getCampaignParams();

    const docId = `${sessionId}`;
    currentSessionDocId = docId;

    const initialEvent: VisitorEvent = {
      type: 'page_view',
      details: `Khởi tạo phiên xem hồ sơ (${initialLanguage.toUpperCase()} - ${env.device})`,
      timestamp: new Date().toISOString()
    };
    currentEvents = [initialEvent];

    // Measure initial visible scroll depth immediately
    const initialDepth = calculateAccurateScrollDepth();
    maxScrollDepth = Math.max(maxScrollDepth, initialDepth);

    // Fetch Geo & ISP
    const geo = await fetchGeoLocation();

    const logData: VisitorLog = {
      id: docId,
      visitorId,
      sessionId,
      timestamp: new Date().toISOString(),
      ip: geo.ip || 'Ẩn danh',
      city: geo.city || 'Không xác định',
      region: geo.region || '',
      country: geo.country || 'Việt Nam',
      countryCode: geo.countryCode || 'VN',
      isp: geo.isp,
      org: geo.org,
      latitude: geo.latitude,
      longitude: geo.longitude,
      timezone: geo.timezone,
      device: env.device,
      browser: env.browser,
      browserVersion: env.browserVersion,
      os: env.os,
      screenResolution: env.screenResolution,
      windowSize: env.windowSize,
      referrer: env.referrer,
      language: initialLanguage,
      colorScheme: initialTheme,
      connectionType: env.connectionType,
      pagePath: window.location.pathname || '/',
      utmSource: campaign.utmSource,
      utmMedium: campaign.utmMedium,
      utmCampaign: campaign.utmCampaign,
      refTag: campaign.refTag,
      scrollDepth: maxScrollDepth,
      durationSeconds: 0,
      events: currentEvents,
      visitedProjects: [],
      leadScore: 'new',
      lastActive: new Date().toISOString()
    };

    // Save initial record to Firestore
    const docRef = doc(db, 'visitor_logs', docId);
    await setDoc(docRef, logData, { merge: true });

    // Setup Scroll Depth Listener with robust milestones
    const scrollMilestones = new Set<number>();
    if (maxScrollDepth >= 25) scrollMilestones.add(25);
    if (maxScrollDepth >= 50) scrollMilestones.add(50);
    if (maxScrollDepth >= 75) scrollMilestones.add(75);
    if (maxScrollDepth >= 100) scrollMilestones.add(100);

    const handleScroll = () => {
      const currentPct = calculateAccurateScrollDepth();
      if (currentPct > maxScrollDepth) {
        maxScrollDepth = currentPct;

        // Check milestones
        [25, 50, 75, 100].forEach(milestone => {
          if (currentPct >= milestone && !scrollMilestones.has(milestone)) {
            scrollMilestones.add(milestone);
            trackEvent('scroll_depth', `Đã cuộn đọc ${milestone}% nội dung trang`);
          }
        });

        // Debounce update to Firestore (1.2 seconds after scroll stops)
        if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer);
        scrollDebounceTimer = setTimeout(() => {
          syncSessionToFirestore();
        }, 1200);
      }
    };

    // Listen on window, document, touch and wheel
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Re-check after images/fonts mount (500ms, 1500ms, 3000ms)
    setTimeout(handleScroll, 500);
    setTimeout(handleScroll, 1500);
    setTimeout(handleScroll, 3000);

    // Set up rapid heartbeat every 6 seconds to update duration, lead score, and scroll depth
    const interval = setInterval(() => {
      syncSessionToFirestore();
    }, 6000);

    // Save on beforeunload / visibilitychange / pagehide
    const handleExit = () => {
      syncSessionToFirestore();
    };

    window.addEventListener('beforeunload', handleExit);
    window.addEventListener('pagehide', handleExit);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        handleExit();
      }
    });

  } catch (error) {
    console.warn('Analytics tracking error:', error);
  }
}

/**
 * Track a specific user action / event
 */
export async function trackEvent(type: string, details?: string, projectName?: string): Promise<void> {
  const newEvent: VisitorEvent = {
    type,
    details: details || '',
    timestamp: new Date().toISOString()
  };
  currentEvents.push(newEvent);

  if (projectName && !currentVisitedProjects.includes(projectName)) {
    currentVisitedProjects.push(projectName);
  }

  if (!currentSessionDocId) return;

  try {
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    const score = computeLeadScore(duration, currentEvents, maxScrollDepth);
    const ref = doc(db, 'visitor_logs', currentSessionDocId);
    await updateDoc(ref, {
      durationSeconds: duration,
      scrollDepth: maxScrollDepth,
      leadScore: score,
      lastActive: new Date().toISOString(),
      events: currentEvents,
      visitedProjects: currentVisitedProjects
    });
  } catch (err) {
    // Non-blocking error
  }
}

/**
 * Update language in visitor session
 */
export async function trackLanguageChange(newLang: string): Promise<void> {
  await trackEvent('change_language', `Đổi ngôn ngữ sang: ${newLang.toUpperCase()}`);
  if (currentSessionDocId) {
    try {
      const ref = doc(db, 'visitor_logs', currentSessionDocId);
      await updateDoc(ref, { language: newLang });
    } catch {}
  }
}

/**
 * Update theme in visitor session
 */
export async function trackThemeChange(isDark: boolean): Promise<void> {
  if (currentSessionDocId) {
    try {
      const ref = doc(db, 'visitor_logs', currentSessionDocId);
      await updateDoc(ref, { colorScheme: isDark ? 'dark' : 'light' });
    } catch {}
  }
}

/**
 * Subscribe to visitor logs for Admin CMS
 */
export function subscribeToVisitorLogs(
  callback: (logs: VisitorLog[]) => void,
  maxLimit: number = 300
) {
  const logsCol = collection(db, 'visitor_logs');
  return onSnapshot(logsCol, (snapshot) => {
    const logs: VisitorLog[] = [];
    snapshot.forEach((docSnap) => {
      logs.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<VisitorLog, 'id'>)
      });
    });
    // Sort descending by timestamp
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    callback(logs.slice(0, maxLimit));
  }, (error) => {
    console.warn('Firestore visitor logs snapshot error:', error);
  });
}

/**
 * Delete a single visitor log (Admin)
 */
export async function deleteVisitorLog(logId: string): Promise<void> {
  const ref = doc(db, 'visitor_logs', logId);
  await deleteDoc(ref);
}

/**
 * Clear multiple logs
 */
export async function clearAllVisitorLogs(logs: VisitorLog[]): Promise<void> {
  for (const log of logs) {
    try {
      const ref = doc(db, 'visitor_logs', log.id);
      await deleteDoc(ref);
    } catch {}
  }
}
