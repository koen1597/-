import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  type User as FirebaseUser
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYasGUIO8m0mK5CR-JImKZKziwH2nzmjc",
  authDomain: "kojin-6097c.firebaseapp.com",
  projectId: "kojin-6097c",
  storageBucket: "kojin-6097c.firebasestorage.app",
  messagingSenderId: "281041176859",
  appId: "1:281041176859:web:125cda2a2814120ffcebbe",
  measurementId: "G-3HTBTDP4HR"
};

// Initialize Firebase App singleton
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google OAuth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * Friendly Korean translation for Firebase Auth error codes
 */
export const getFirebaseAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return '등록되지 않은 이메일 계정입니다. 회원가입을 먼저 진행해주세요.';
    case 'auth/wrong-password':
      return '비밀번호가 올바르지 않습니다. 다시 확인해주세요.';
    case 'auth/invalid-credential':
      return '이메일 또는 비밀번호가 올바르지 않습니다.';
    case 'auth/email-already-in-use':
      return '이미 가입된 이메일 계정입니다. 해당 이메일로 로그인해주세요.';
    case 'auth/weak-password':
      return '보안을 위해 비밀번호는 최소 6자리 이상으로 설정해주세요.';
    case 'auth/invalid-email':
      return '올바른 이메일 형식을 입력해주세요.';
    case 'auth/popup-closed-by-user':
      return 'Google 로그인 창이 닫혔습니다. 로그인을 계속하시려면 다시 시도해주세요.';
    case 'auth/cancelled-popup-request':
      return '이전 로그인 요청이 진행 중입니다. 잠시 후 다시 시도해주세요.';
    case 'auth/popup-blocked':
      return '브라우저 팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.';
    case 'auth/network-request-failed':
      return '네트워크 연결이 불안정합니다. 인터넷 연결을 확인해주세요.';
    case 'auth/too-many-requests':
      return '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.';
    case 'auth/requires-recent-login':
      return '보안을 위해 다시 로그인한 후 비밀번호를 변경해주세요.';
    default:
      return '인증 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
};

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
};
export type { FirebaseUser };
