import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth
      "welcome": "Welcome",
      "loginTitle": "Sign in to your account",
      "enterPhone": "Enter your phone number to receive a verification code",
      "phoneNumber": "Phone Number",
      "countryCode": "Country Code",
      "sendCode": "Send Code",
      "enterCode": "Enter the verification code sent to your phone",
      "verificationCode": "Verification Code",
      "verify": "Verify",
      "resendCode": "Resend Code",
      
      // Navigation
      "home": "Home",
      "cart": "Cart",
      "orders": "Orders",
      "profile": "Profile",
      "logout": "Logout",
      
      // Categories
      "allCategories": "All Categories",
      "food": "Food",
      "cloth": "Clothing",
      "electronic": "Electronics",
      
      // Products
      "products": "Products",
      "discount": "Discount",
      "off": "OFF",
      "addToCart": "Add to Cart",
      "quantity": "Quantity",
      "color": "Color",
      "size": "Size",
      "description": "Description",
      "rating": "Rating",
      "reviews": "Reviews",
      
      // Cart
      "myCart": "My Cart",
      "emptyCart": "Your cart is empty",
      "subtotal": "Subtotal",
      "deliveryFee": "Delivery Fee",
      "total": "Total",
      "checkout": "Checkout",
      "remove": "Remove",
      "update": "Update",
      
      // Checkout
      "deliveryInfo": "Delivery Information",
      "selectLocation": "Select Delivery Location",
      "address": "Address",
      "paymentMethod": "Payment Method",
      "cashOnDelivery": "Cash on Delivery",
      "syriatelCash": "Syriatel Cash",
      "placeOrder": "Place Order",
      
      // Orders
      "myOrders": "My Orders",
      "orderNumber": "Order #",
      "orderDate": "Order Date",
      "orderStatus": "Status",
      "pending": "Pending",
      "processing": "Processing",
      "shipped": "Shipped",
      "delivered": "Delivered",
      "cancelled": "Cancelled",
      "viewDetails": "View Details",
      
      // Profile
      "myProfile": "My Profile",
      "personalInfo": "Personal Information",
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "saveChanges": "Save Changes",
      "language": "Language",
      "english": "English",
      "arabic": "Arabic",
      
      // Common
      "search": "Search",
      "filter": "Filter",
      "cancel": "Cancel",
      "confirm": "Confirm",
      "edit": "Edit",
      "delete": "Delete",
      "save": "Save",
      "back": "Back",
      "next": "Next",
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      
      // Promotions
      "specialOffer": "Special Offer",
      "limitedTime": "Limited Time Offer!",
      "shopNow": "Shop Now",
      
      // Map
      "selectLocationOnMap": "Select Location on Map",
      "hideMap": "Hide Map",
    }
  },
  ar: {
    translation: {
      // Auth
      "welcome": "مرحباً",
      "loginTitle": "تسجيل الدخول إلى حسابك",
      "enterPhone": "أدخل رقم هاتفك لتلقي رمز التحقق",
      "phoneNumber": "رقم الهاتف",
      "countryCode": "رمز البلد",
      "sendCode": "إرسال الرمز",
      "enterCode": "أدخل رمز التحقق المرسل إلى هاتفك",
      "verificationCode": "رمز التحقق",
      "verify": "تحقق",
      "resendCode": "إعادة إرسال الرمز",
      
      // Navigation
      "home": "الرئيسية",
      "cart": "السلة",
      "orders": "الطلبات",
      "profile": "الملف الشخصي",
      "logout": "تسجيل الخروج",
      
      // Categories
      "allCategories": "جميع الفئات",
      "food": "طعام",
      "cloth": "ملابس",
      "electronic": "إلكترونيات",
      
      // Products
      "products": "المنتجات",
      "discount": "خصم",
      "off": "خصم",
      "addToCart": "أضف إلى السلة",
      "quantity": "الكمية",
      "color": "اللون",
      "size": "المقاس",
      "description": "الوصف",
      "rating": "التقييم",
      "reviews": "المراجعات",
      
      // Cart
      "myCart": "سلتي",
      "emptyCart": "سلتك فارغة",
      "subtotal": "المجموع الفرعي",
      "deliveryFee": "رسوم التوصيل",
      "total": "المجموع",
      "checkout": "إتمام الطلب",
      "remove": "إزالة",
      "update": "تحديث",
      
      // Checkout
      "deliveryInfo": "معلومات التوصيل",
      "selectLocation": "اختر موقع التوصيل",
      "address": "العنوان",
      "paymentMethod": "طريقة الدفع",
      "cashOnDelivery": "الدفع عند الاستلام",
      "syriatelCash": "سيرياتيل كاش",
      "placeOrder": "تأكيد الطلب",
      
      // Orders
      "myOrders": "طلباتي",
      "orderNumber": "طلب رقم",
      "orderDate": "تاريخ الطلب",
      "orderStatus": "الحالة",
      "pending": "قيد الانتظار",
      "processing": "قيد المعالجة",
      "shipped": "تم الشحن",
      "delivered": "تم التسليم",
      "cancelled": "ملغي",
      "viewDetails": "عرض التفاصيل",
      
      // Profile
      "myProfile": "ملفي الشخصي",
      "personalInfo": "المعلومات الشخصية",
      "name": "الاسم",
      "email": "البريد الإلكتروني",
      "phone": "الهاتف",
      "saveChanges": "حفظ التغييرات",
      "language": "اللغة",
      "english": "الإنجليزية",
      "arabic": "العربية",
      
      // Common
      "search": "بحث",
      "filter": "تصفية",
      "cancel": "إلغاء",
      "confirm": "تأكيد",
      "edit": "تعديل",
      "delete": "حذف",
      "save": "حفظ",
      "back": "رجوع",
      "next": "التالي",
      "loading": "جاري التحميل...",
      "error": "خطأ",
      "success": "نجح",
      
      // Promotions
      "specialOffer": "عرض خاص",
      "limitedTime": "عرض لفترة محدودة!",
      "shopNow": "تسوق الآن",
      
      // Map
      "selectLocationOnMap": "اختر الموقع على الخريطة",
      "hideMap": "إخفاء الخريطة",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;