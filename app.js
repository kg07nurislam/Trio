/**
 * Trio — 3-in-1 Productivity Tool
 * Event Countdown, Color Palette Generator, and Personal Bookshelf
 * 
 * Clean vanilla JavaScript with versioned localStorage, full Kyrgyz & English i18n,
 * accessible dialogs, and high-contrast responsive controls.
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. Storage Keys & Constants
  // =========================================================================
  const STORAGE_KEYS = {
    EVENTS: "trio_v1_events",
    PALETTES: "trio_v1_palettes",
    BOOKS: "trio_v1_books",
    LANG: "trio_v1_lang",
    THEME: "trio_v1_theme",
  };

  // =========================================================================
  // 2. Internationalization (Kyrgyz & English Dictionaries)
  // =========================================================================
  const I18N = {
    ky: {
      tagline: "3-in-1 Куралдар топтому",
      navHome: "Башкы бет",
      navEvents: "Окуялар",
      navColors: "Түстөр",
      navBooks: "Китептер",
      navSettings: "Жөндөөлөр",
      
      // Home
      homeWelcome: "Кош келиңиз!",
      homeDescription: "Trio — окуяларыңызды эсептеп, жаңы түстөрдү таап, сүйүктүү китептериңизди көзөмөлдөөчү жеке мейкиндик.",
      quickAddEvent: "Окуя кошуу",
      quickGeneratePalette: "Палитра жаратуу",
      quickAddBook: "Китеп кошуу",
      statUpcomingEvents: "Алдыдагы окуялар",
      statSavedPalettes: "Сакталган палитралар",
      statReadingBooks: "Окулуп жаткан китептер",
      dashboardSpotlight: "Учурдагы сереп",
      nearestEventTag: "Эң жакын окуя",
      latestPaletteTag: "Акыркы палитра",
      activeBookTag: "Акыркы окулган китеп",
      viewAll: "Баарын көрүү →",
      emptyNoUpcomingEvents: "Алдыда эч кандай окуя жок",
      emptyNoUpcomingEventsDesc: "Маанилүү күндү же туулган күндү кошуп баштаңыз.",
      emptyNoSavedPalettes: "Сакталган палитра жок",
      emptyNoSavedPalettesDesc: "Түстөр бөлүмүнөн кооз палитраларды жаратып, сактап алыңыз.",
      emptyNoReadingBooks: "Окулуп жаткан китеп жок",
      emptyNoReadingBooksDesc: "Окууну баштап, барактарды белгилеп туруңуз.",

      // Events
      eventsTitle: "Окуяларга артка саноо",
      eventsDescription: "Маанилүү күндөрдү, туулган күндөрдү жана саякаттарды календарлык күндөр боюнча так көзөмөлдөңүз.",
      addEventBtn: "Окуя кошуу",
      filterAll: "Баары",
      filterUpcoming: "Алдыда",
      filterPast: "Өткөн",
      emptyEventsList: "Окуялар табылган жок",
      emptyEventsListDesc: "Жаңы окуя кошуу үчүн жогорудагы баскычты басыңыз.",
      countdownToday: "Бүгүн!",
      countdownTomorrow: "Эртең",
      countdownYesterday: "Кечээ",
      countdownDaysRemaining: "күн калды",
      countdownDaysAgo: "күн мурун",
      repeatAnnualBadge: "Жыл сайын кайталанат",
      confirmDeleteEvent: "Бул окуяны өчүргүңүз келеби?",
      
      // Event Categories
      categoryBirthday: "🎂 Туулган күн",
      categoryTrip: "✈️ Саякат",
      categoryExam: "📝 Сынак",
      categoryCelebration: "🎉 Майрам",
      categoryOther: "📌 Башка",

      // Event Form
      modalAddEventTitle: "Жаңы окуя кошуу",
      modalEditEventTitle: "Окуяны өзгөртүү",
      formEventName: "Окуянын аталышы *",
      formEventNamePlaceholder: "мис., Айгүлдүн туулган күнү",
      formEventDate: "Максаттуу дата *",
      formEventCategory: "Категория",
      formEventIcon: "Иконка / Эмодзи",
      formEventAccent: "Басым түсү",
      formEventRepeat: "Жыл сайын кайталоо (маараке/туулган күн)",
      formEventRepeatHint: "Жыл сайын кайталанган окуянын кийинки күнү автоматтык түрдө эсептелет. 29-февраль толук эмес жылдарда 28-февраль деп эсептелет.",
      formEventNote: "Кошумча эскертүү (каалоо боюнча)",
      formEventNotePlaceholder: "Белек даярдоо, билет алуу ж.б.",
      errorEventNameRequired: "Сураныч, окуянын аталышын жазыңыз.",
      errorEventDateRequired: "Сураныч, жарактуу датаны тандаңыз.",

      // Colors
      colorsTitle: "Түстөр палитрасы",
      colorsDescription: "Беш түстөн турган гармониялуу палитраларды жаратыңыз, кулпулаңыз жана сактап коюңуз.",
      btnSavePalette: "Палитраны сактоо",
      btnGeneratePalette: "Жаңы палитра",
      btnCopyAll: "Баарын көчүрүү",
      spacebarHint: "баскычын басып жаңы палитра жаратсаңыз болот",
      allColorsLockedNotice: "Бардык 5 түс кулпуланган. Жаңы палитра жаратуу үчүн жок дегенде бир түстүн кулпусун ачыңыз.",
      savedPalettesTitle: "Сакталган палитралар",
      emptySavedPalettesList: "Сакталган палитралар жок",
      emptySavedPalettesListDesc: "Жаккан түстөрдү сактап, дизайн долбоорлоруңузда колдонуңуз.",
      modalSavePaletteTitle: "Палитраны сактоо",
      formPaletteName: "Палитранын аталышы (каалоо боюнча)",
      formPaletteNamePlaceholder: "мис., Күзгү кеч",
      formPaletteNameHint: "Эгер аталыш жазылбаса, автоматтык түрдө نوم берилет.",
      defaultPaletteNamePrefix: "Палитра",
      confirmDeletePalette: "Бул палитраны өчүргүңүз келеби?",
      toastColorCopied: "Көчүрүлдү: ",
      toastAllColorsCopied: "Бардык 5 түс көчүрүлдү!",
      toastPaletteSaved: "Палитра ийгиликтүү сакталды!",
      toastPaletteDeleted: "Палитра өчүрүлдү.",
      btnOpenInEditor: "Палитраны ачуу",
      btnRenamePalette: "Атын өзгөртүү",

      // Books
      booksTitle: "Жеке китеп текчеси",
      booksDescription: "Окуу максаттарыңызды коюп, окулган беттерди жана китептердин жүрүшүн белгилеп туруңуз.",
      addBookBtn: "Китеп кошуу",
      booksStatTotal: "Жалпы китептер",
      booksStatReading: "Окуп жаткандар",
      booksStatFinished: "Окулуп бүттү",
      booksStatPages: "Окулган беттер",
      searchBooksPlaceholder: "Китеп же автор боюнча издөө...",
      sortBooksLabel: "Иреттөө",
      sortRecent: "Акыркы жаңыртылгандар",
      sortTitle: "Аталышы (А-Я)",
      sortRating: "Эң жогорку баа",
      sortProgress: "Окуу пайызы боюнча",
      statusWantToRead: "Окугум келет",
      statusReading: "Окуп жатам",
      statusFinished: "Окулуп бүттү",
      ratingUnrated: "Баалана элек",
      emptyBooksList: "Китептер табылган жок",
      emptyBooksListDesc: "Китеп кошуу үчүн жогорудагы баскычты басыңыз.",
      modalAddBookTitle: "Жаңы китеп кошуу",
      modalEditBookTitle: "Китепти өзгөртүү",
      formBookTitle: "Китептин аталышы *",
      formBookTitlePlaceholder: "мис., Саякбай, Жамийла, Атомдук адаттар",
      formBookAuthor: "Автору (каалоо боюнча)",
      formBookAuthorPlaceholder: "мис., Чыңгыз Айтматов",
      formBookTotalPages: "Жалпы бет саны *",
      formBookPagesRead: "Окулган беттер",
      formBookStatus: "Окуу абалы",
      formBookRating: "Баалоо",
      formBookCoverUrl: "Мукабанын сүрөт шилтемеси (URL)",
      formBookCoverPlaceholder: "https://example.com/cover.jpg",
      formBookCoverHint: "Бош калтырылса же сүрөт жүктөлбөсө, стилдүү жасалма мукаба көрсөтүлөт.",
      formBookNotes: "Китеп боюнча ойлор же цитаталар",
      formBookNotesPlaceholder: "Эң жакшы цитата же кыскача пикир...",
      errorBookTitleRequired: "Сураныч, китептин аталышын жазыңыз.",
      errorBookTotalPagesRequired: "Жалпы бет саны 1ден чоң оң сан болушу керек.",
      errorBookPagesReadRange: "Окулган беттер 0дөн жалпы бет санына чейин гана болушу керек.",
      btnUpdateProgress: "Бетти жаңыртуу",
      modalProgressTitle: "Окуу жүрүшүн жаңыртуу",
      btnSaveProgress: "Жаңыртуу",
      confirmDeleteBook: "Бул китепти текчеден өчүргүңүз келеби?",
      pagesUnit: "бет",

      // Settings
      settingsTitle: "Жөндөөлөр жана Дайындар",
      settingsDescription: "Тилди, теманы тандаңыз жана маалыматтарыңыздын камдык көчүрмөсүн (JSON) сактап алыңыз.",
      prefHeading: "Интерфейс жана Көрүнүш",
      settingLanguage: "Интерфейс тили",
      settingLanguageDesc: "Кыргызча же English тилдеринин бирин тандаңыз",
      settingTheme: "Тема",
      settingThemeDesc: "Жарык, күңүрт же системанын жөндөөсүнө ылайык",
      themeLight: "Жарык",
      themeDark: "Күңүрт",
      themeSystem: "Системалык",
      dataManagementHeading: "Дайындарды сактоо жана калыбына келтирүү",
      storageNotice: "Бардык маалыматтар ушул браузердин локалдык сактагычында (localStorage) сакталат жана автоматтык түрдө башка түзмөктөргө синхорондошпойт. Браузердин тарыхы тазаланганда өчүп калбашы үчүн мезгил-мезгили менен JSON камдык көчүрмөсүн жүктөп алыңыз.",
      btnExportBackup: "JSON камдык көчүрмөсүн экспорттоо",
      btnImportBackup: "JSON камдык көчүрмөсүн импорттоо",
      dangerZoneHeading: "Коркунучтуу аймак",
      dangerZoneDesc: "Бардык окуяларды, палитраларды жана китептерди толугу менен өчүрүү. Бул аракетти кайтаруу мүмкүн эмес.",
      btnDeleteAllData: "Бардык дайындарды биротоло өчүрүү",
      confirmDeleteAll: "Чын эле бардык маалыматтарды өчүргүңүз келеби? Бул кадамды артка кайтаруу мүмкүн эмес!",
      confirmImportReplace: "Камдык көчүрмөнү импорттоо учурдагы бардык окуяларды, палитраларды жана китептерди толугу менен алмаштырат. Улантасызбы?",
      toastDataImported: "Дайындар ийгиликтүү жүктөлдү!",
      toastDataExported: "Камдык көчүрмө жүктөлүп алынды.",
      toastDataCleared: "Бардык маалыматтар өчүрүлдү.",
      toastInvalidBackup: "Ката: Файл жарактуу Trio камдык көчүрмөсү эмес!",

      // Common Controls
      btnSave: "Сактоо",
      btnCancel: "Жокко чыгаруу",
      btnDelete: "Өчүрүү",
      btnEdit: "Өзгөртүү",
      btnClose: "Жабуу",
      btnCopy: "Көчүрүү",
      btnLock: "Кулпулоо",
      btnUnlock: "Кулпуну ачуу",
      toastSaveFailed: "Сактоо катасы: браузердин сактагычы толгон же чектелген!",
      modalManualCopyTitle: "Текстти көчүрүү",
      modalManualCopyHint: "Браузердин түз көчүрүү мүмкүнчүлүгү чектелген. Төмөнкү текстти бөлүп алып, Ctrl+C (же Cmd+C) басыңыз:",
    },

    en: {
      tagline: "3-in-1 Productivity Suite",
      navHome: "Home",
      navEvents: "Events",
      navColors: "Colors",
      navBooks: "Books",
      navSettings: "Settings",

      // Home
      homeWelcome: "Welcome to Trio!",
      homeDescription: "Trio combines event countdowns, color palette generation, and your personal reading bookshelf in one calm, unified space.",
      quickAddEvent: "Add Event",
      quickGeneratePalette: "Generate Palette",
      quickAddBook: "Add Book",
      statUpcomingEvents: "Upcoming Events",
      statSavedPalettes: "Saved Palettes",
      statReadingBooks: "Currently Reading",
      dashboardSpotlight: "Current Spotlight",
      nearestEventTag: "Nearest Event",
      latestPaletteTag: "Latest Palette",
      activeBookTag: "Active Reading",
      viewAll: "View all →",
      emptyNoUpcomingEvents: "No upcoming events",
      emptyNoUpcomingEventsDesc: "Add birthdays, trips, or milestones to count down the days.",
      emptyNoSavedPalettes: "No saved palettes",
      emptyNoSavedPalettesDesc: "Generate beautiful palettes and save your favorites here.",
      emptyNoReadingBooks: "No book in progress",
      emptyNoReadingBooksDesc: "Pick up a book and track your reading pages.",

      // Events
      eventsTitle: "Event Countdown",
      eventsDescription: "Track birthdays, exams, trips, and special milestones accurately by calendar days.",
      addEventBtn: "Add Event",
      filterAll: "All",
      filterUpcoming: "Upcoming",
      filterPast: "Past",
      emptyEventsList: "No events found",
      emptyEventsListDesc: "Click the button above to add your first event.",
      countdownToday: "Today!",
      countdownTomorrow: "Tomorrow",
      countdownYesterday: "Yesterday",
      countdownDaysRemaining: "days left",
      countdownDaysAgo: "days ago",
      repeatAnnualBadge: "Repeats annually",
      confirmDeleteEvent: "Are you sure you want to delete this event?",

      // Event Categories
      categoryBirthday: "🎂 Birthday",
      categoryTrip: "✈️ Trip",
      categoryExam: "📝 Exam",
      categoryCelebration: "🎉 Celebration",
      categoryOther: "📌 Other",

      // Event Form
      modalAddEventTitle: "Add New Event",
      modalEditEventTitle: "Edit Event",
      formEventName: "Event Name *",
      formEventNamePlaceholder: "e.g., Aigul's Birthday",
      formEventDate: "Target Date *",
      formEventCategory: "Category",
      formEventIcon: "Icon / Emoji",
      formEventAccent: "Accent Color",
      formEventRepeat: "Repeat every year (annual anniversary/birthday)",
      formEventRepeatHint: "Annual events automatically compute the next upcoming occurrence. February 29th defaults to February 28th in non-leap years.",
      formEventNote: "Optional Note",
      formEventNotePlaceholder: "Buy presents, book flights, etc.",
      errorEventNameRequired: "Please enter an event name.",
      errorEventDateRequired: "Please select a valid date.",

      // Colors
      colorsTitle: "Color Palette Generator",
      colorsDescription: "Generate harmonious five-color palettes, lock favorite shades, and save custom collections.",
      btnSavePalette: "Save Palette",
      btnGeneratePalette: "Generate Palette",
      btnCopyAll: "Copy All",
      spacebarHint: "Press spacebar anywhere on this tab to generate new colors",
      allColorsLockedNotice: "All 5 colors are locked. Unlock at least one color swatch to generate new combinations.",
      savedPalettesTitle: "Saved Palettes",
      emptySavedPalettesList: "No saved palettes yet",
      emptySavedPalettesListDesc: "Lock shades you like and click 'Save Palette' to build your collection.",
      modalSavePaletteTitle: "Save Palette",
      formPaletteName: "Palette Name (optional)",
      formPaletteNamePlaceholder: "e.g., Autumn Sunset",
      formPaletteNameHint: "If left blank, an automatic name will be assigned.",
      defaultPaletteNamePrefix: "Palette",
      confirmDeletePalette: "Are you sure you want to delete this palette?",
      toastColorCopied: "Copied: ",
      toastAllColorsCopied: "All 5 colors copied to clipboard!",
      toastPaletteSaved: "Palette successfully saved!",
      toastPaletteDeleted: "Palette deleted.",
      btnOpenInEditor: "Open in Editor",
      btnRenamePalette: "Rename",

      // Books
      booksTitle: "Personal Bookshelf",
      booksDescription: "Organize your reading journey, track page progress, and capture your personal ratings.",
      addBookBtn: "Add Book",
      booksStatTotal: "Total Books",
      booksStatReading: "Currently Reading",
      booksStatFinished: "Finished Books",
      booksStatPages: "Pages Read",
      searchBooksPlaceholder: "Search by title or author...",
      sortBooksLabel: "Sort by",
      sortRecent: "Recently Updated",
      sortTitle: "Title (A-Z)",
      sortRating: "Highest Rating",
      sortProgress: "Reading Progress",
      statusWantToRead: "Want to Read",
      statusReading: "Reading",
      statusFinished: "Finished",
      ratingUnrated: "Unrated",
      emptyBooksList: "No books found",
      emptyBooksListDesc: "Add a book to start tracking your reading progress.",
      modalAddBookTitle: "Add New Book",
      modalEditBookTitle: "Edit Book",
      formBookTitle: "Book Title *",
      formBookTitlePlaceholder: "e.g., Jamila, Atomic Habits, The Hobbit",
      formBookAuthor: "Author (optional)",
      formBookAuthorPlaceholder: "e.g., Chingiz Aitmatov",
      formBookTotalPages: "Total Pages *",
      formBookPagesRead: "Pages Read",
      formBookStatus: "Reading Status",
      formBookRating: "Rating",
      formBookCoverUrl: "Cover Image URL",
      formBookCoverPlaceholder: "https://example.com/cover.jpg",
      formBookCoverHint: "If left empty or fails to load, a styled cover placeholder will be generated.",
      formBookNotes: "Notes or Favorite Quotes",
      formBookNotesPlaceholder: "Memorable quotes or key impressions...",
      errorBookTitleRequired: "Please enter a book title.",
      errorBookTotalPagesRequired: "Total pages must be a positive integer greater than zero.",
      errorBookPagesReadRange: "Pages read must be between 0 and total pages.",
      btnUpdateProgress: "Update Pages",
      modalProgressTitle: "Update Reading Progress",
      btnSaveProgress: "Update",
      confirmDeleteBook: "Are you sure you want to remove this book?",
      pagesUnit: "pages",

      // Settings
      settingsTitle: "Settings & Data",
      settingsDescription: "Choose your interface language, theme, and manage JSON data backups.",
      prefHeading: "Interface & Appearance",
      settingLanguage: "Interface Language",
      settingLanguageDesc: "Choose between Kyrgyz or English",
      settingTheme: "Theme",
      settingThemeDesc: "Light, Dark, or follow your system preference",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
      dataManagementHeading: "Data Storage & Backups",
      storageNotice: "All records are saved directly in your browser's localStorage and do not automatically sync across devices. To prevent data loss if browser storage is cleared, periodically export a JSON backup.",
      btnExportBackup: "Export JSON Backup",
      btnImportBackup: "Import JSON Backup",
      dangerZoneHeading: "Danger Zone",
      dangerZoneDesc: "Erase all events, palettes, and books permanently. This action cannot be undone.",
      btnDeleteAllData: "Delete All Application Data",
      confirmDeleteAll: "Are you completely sure you want to delete all application data? This action cannot be reversed!",
      confirmImportReplace: "Importing backup data will overwrite all existing events, palettes, and books. Do you want to proceed?",
      toastDataImported: "Data successfully restored from backup!",
      toastDataExported: "JSON backup downloaded successfully.",
      toastDataCleared: "All application data has been wiped.",
      toastInvalidBackup: "Error: The selected file is not a valid Trio backup!",

      // Common Controls
      btnSave: "Save",
      btnCancel: "Cancel",
      btnDelete: "Delete",
      btnEdit: "Edit",
      btnClose: "Close",
      btnCopy: "Copy",
      btnLock: "Lock",
      btnUnlock: "Unlock",
      toastSaveFailed: "Storage Error: Browser storage quota exceeded or disabled!",
      modalManualCopyTitle: "Copy Text",
      modalManualCopyHint: "Clipboard access is limited in this environment. Please highlight the text below and press Ctrl+C (or Cmd+C):",
    }
  };

  // State holder
  let currentLang = "ky";
  let currentTheme = "system";

  // Helper translation function
  function t(key) {
    if (I18N[currentLang] && I18N[currentLang][key]) {
      return I18N[currentLang][key];
    }
    if (I18N.en && I18N.en[key]) {
      return I18N.en[key];
    }
    return key;
  }

  // =========================================================================
  // 3. Safe Storage Service
  // =========================================================================
  const Storage = {
    get(key, defaultValue) {
      try {
        const item = localStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
      } catch (err) {
        console.error("Storage read error:", key, err);
        return defaultValue;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (err) {
        console.error("Storage write error:", key, err);
        Toasts.show(t("toastSaveFailed"), "error");
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        console.error("Storage remove error:", key, err);
      }
    },

    clearAll() {
      try {
        localStorage.removeItem(STORAGE_KEYS.EVENTS);
        localStorage.removeItem(STORAGE_KEYS.PALETTES);
        localStorage.removeItem(STORAGE_KEYS.BOOKS);
        // Retain language & theme preferences
        return true;
      } catch (err) {
        console.error("Storage clear error:", err);
        return false;
      }
    }
  };

  // =========================================================================
  // 4. Toast Notification Service
  // =========================================================================
  const Toasts = {
    container: document.getElementById("toast-container"),

    show(message, type = "info", duration = 3200) {
      if (!this.container) return;

      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      toast.setAttribute("role", "status");

      let iconSvg = "";
      if (type === "success") {
        iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
      } else if (type === "error") {
        iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
      } else {
        iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      }

      toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
      this.container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("toast-hiding");
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 220);
      }, duration);
    }
  };

  // Escape HTML helper for safe text rendering
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // 5. Accessible Modal Service
  // =========================================================================
  const Modals = {
    activeModal: null,
    triggerElement: null,

    open(modalId, trigger = null) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      this.triggerElement = trigger || document.activeElement;
      this.activeModal = modal;
      modal.style.display = "flex";

      // Focus first actionable field
      const focusable = modal.querySelectorAll("input, select, textarea, button:not([disabled])");
      if (focusable.length > 0) {
        setTimeout(() => {
          const firstVisible = Array.from(focusable).find(el => el.offsetParent !== null && !el.classList.contains("modal-btn-close"));
          if (firstVisible) firstVisible.focus();
          else focusable[0].focus();
        }, 50);
      }
    },

    close(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.style.display = "none";
      if (this.activeModal === modal) {
        this.activeModal = null;
      }

      if (this.triggerElement && typeof this.triggerElement.focus === "function") {
        this.triggerElement.focus();
      }
      this.triggerElement = null;
    },

    init() {
      // Backdrop click and close buttons
      document.querySelectorAll("[data-close-modal]").forEach(btn => {
        btn.addEventListener("click", () => {
          const modalId = btn.getAttribute("data-close-modal");
          Modals.close(modalId);
        });
      });

      // Close when clicking directly on backdrop
      document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", (e) => {
          if (e.target === backdrop) {
            Modals.close(backdrop.id);
          }
        });
      });

      // Escape key to close open modal
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && Modals.activeModal) {
          Modals.close(Modals.activeModal.id);
        }
      });
    }
  };

  // Generic Confirm Dialog Wrapper
  function showConfirm(descText, onAccept) {
    const descEl = document.getElementById("modal-confirm-desc");
    const acceptBtn = document.getElementById("btn-confirm-accept");
    if (descEl) descEl.textContent = descText;

    const handler = () => {
      acceptBtn.removeEventListener("click", handler);
      Modals.close("modal-confirm");
      onAccept();
    };

    // Remove any previous listener by cloning
    const newAcceptBtn = acceptBtn.cloneNode(true);
    acceptBtn.parentNode.replaceChild(newAcceptBtn, acceptBtn);
    newAcceptBtn.addEventListener("click", handler);

    Modals.open("modal-confirm");
  }

  // =========================================================================
  // 6. Navigation & View Routing
  // =========================================================================
  const Navigation = {
    activeTab: "home",

    switchTab(tabId) {
      if (!["home", "events", "colors", "books", "settings"].includes(tabId)) {
        tabId = "home";
      }
      this.activeTab = tabId;

      // Update sidebar nav items
      document.querySelectorAll(".nav-item").forEach(item => {
        if (item.getAttribute("data-tab") === tabId) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Update mobile bottom nav items
      document.querySelectorAll(".bottom-nav-item").forEach(item => {
        if (item.getAttribute("data-tab") === tabId) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Update sections
      document.querySelectorAll(".page-section").forEach(sec => {
        if (sec.id === `section-${tabId}`) {
          sec.classList.add("active");
        } else {
          sec.classList.remove("active");
        }
      });

      window.scrollTo({ top: 0, behavior: "smooth" });

      // Refresh specific tab data if necessary
      if (tabId === "home") Dashboard.render();
      if (tabId === "events") EventsModule.render();
      if (tabId === "colors") PaletteModule.render();
      if (tabId === "books") BooksModule.render();
    },

    init() {
      // Sidebar desktop tabs
      document.querySelectorAll(".nav-item[data-tab]").forEach(btn => {
        btn.addEventListener("click", () => {
          this.switchTab(btn.getAttribute("data-tab"));
        });
      });

      // Mobile bottom nav tabs
      document.querySelectorAll(".bottom-nav-item[data-tab]").forEach(btn => {
        btn.addEventListener("click", () => {
          this.switchTab(btn.getAttribute("data-tab"));
        });
      });

      // Mobile top settings button
      const mobileSettingsBtn = document.getElementById("btn-open-settings-mobile");
      if (mobileSettingsBtn) {
        mobileSettingsBtn.addEventListener("click", () => {
          this.switchTab("settings");
        });
      }
    }
  };

  // =========================================================================
  // 7. Theme & Language Manager
  // =========================================================================
  const ThemeAndLang = {
    init() {
      // 1. Language restoration (defaulting to Kyrgyz 'ky')
      const savedLang = Storage.get(STORAGE_KEYS.LANG, "ky");
      currentLang = (savedLang === "en") ? "en" : "ky";

      // 2. Theme restoration
      const savedTheme = Storage.get(STORAGE_KEYS.THEME, "system");
      currentTheme = savedTheme;

      this.applyTheme(currentTheme, false);
      this.applyLanguage(currentLang, false);

      // System color scheme change listener
      if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
          if (currentTheme === "system") {
            this.applyTheme("system", false);
          }
        });
      }

      // Settings Theme Buttons
      document.querySelectorAll("[data-theme-val]").forEach(btn => {
        btn.addEventListener("click", () => {
          const themeVal = btn.getAttribute("data-theme-val");
          this.setTheme(themeVal);
        });
      });

      // Settings Language Buttons
      document.querySelectorAll("[data-lang-val]").forEach(btn => {
        btn.addEventListener("click", () => {
          const langVal = btn.getAttribute("data-lang-val");
          this.setLanguage(langVal);
        });
      });

      // Quick Theme Toggle on Mobile Header
      const quickThemeBtn = document.getElementById("btn-theme-quick");
      if (quickThemeBtn) {
        quickThemeBtn.addEventListener("click", () => {
          const next = currentTheme === "dark" ? "light" : "dark";
          this.setTheme(next);
        });
      }
    },

    setTheme(theme) {
      currentTheme = theme;
      Storage.set(STORAGE_KEYS.THEME, theme);
      this.applyTheme(theme, true);
    },

    applyTheme(theme, showNotification) {
      document.documentElement.setAttribute("data-theme", theme);

      // Update segmented controls in Settings
      document.querySelectorAll("[data-theme-val]").forEach(btn => {
        const val = btn.getAttribute("data-theme-val");
        if (val === theme) {
          btn.classList.add("active");
          btn.setAttribute("aria-checked", "true");
        } else {
          btn.classList.remove("active");
          btn.setAttribute("aria-checked", "false");
        }
      });

      // Update sidebar indicator
      const sidebarThemeIndicator = document.getElementById("sidebar-current-theme");
      if (sidebarThemeIndicator) {
        sidebarThemeIndicator.textContent = theme.toUpperCase();
      }

      if (showNotification) {
        const nameKey = theme === "light" ? "themeLight" : (theme === "dark" ? "themeDark" : "themeSystem");
        Toasts.show(t(nameKey), "info", 1800);
      }
    },

    setLanguage(lang) {
      currentLang = lang;
      Storage.set(STORAGE_KEYS.LANG, lang);
      this.applyLanguage(lang, true);
    },

    applyLanguage(lang, showNotification) {
      document.documentElement.setAttribute("lang", lang);

      // Translate all data-i18n elements
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = t(key);
      });

      // Translate all data-i18n-placeholder elements
      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        el.setAttribute("placeholder", t(key));
      });

      // Update segmented controls in Settings
      document.querySelectorAll("[data-lang-val]").forEach(btn => {
        const val = btn.getAttribute("data-lang-val");
        if (val === lang) {
          btn.classList.add("active");
          btn.setAttribute("aria-checked", "true");
        } else {
          btn.classList.remove("active");
          btn.setAttribute("aria-checked", "false");
        }
      });

      // Update sidebar indicator
      const sidebarLangIndicator = document.getElementById("sidebar-current-lang");
      if (sidebarLangIndicator) {
        sidebarLangIndicator.textContent = lang.toUpperCase();
      }

      // Re-render all modules with new translations
      Dashboard.render();
      EventsModule.render();
      PaletteModule.render();
      BooksModule.render();

      if (showNotification) {
        Toasts.show(lang === "ky" ? "Тил алмаштырылды: Кыргызча" : "Language changed: English", "success");
      }
    }
  };

  // =========================================================================
  // 8. Date & Calendar Utilities (DST & Timezone Safe)
  // =========================================================================
  const DateUtils = {
    // Return today's local date components at midnight [year, monthIndex, day]
    getTodayParts() {
      const now = new Date();
      return [now.getFullYear(), now.getMonth(), now.getDate()];
    },

    // Leap year check
    isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

    // Difference in calendar days between targetDate and today's local calendar day
    // Returns positive number for future days, 0 for today, negative for past days
    diffInDays(targetDateStr, isAnnual = false) {
      if (!targetDateStr) return 0;
      const parts = targetDateStr.split("-").map(Number);
      if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
        return 0;
      }

      const [targetY, targetM, targetD] = [parts[0], parts[1] - 1, parts[2]];
      const [todayY, todayM, todayD] = this.getTodayParts();

      const todayMidnight = new Date(todayY, todayM, todayD, 0, 0, 0, 0);

      if (!isAnnual) {
        const targetMidnight = new Date(targetY, targetM, targetD, 0, 0, 0, 0);
        const msDiff = targetMidnight.getTime() - todayMidnight.getTime();
        return Math.round(msDiff / (1000 * 60 * 60 * 24));
      }

      // Handle Annual Recurrence
      // Determine occurrence in this year
      let thisYearD = targetD;
      let thisYearM = targetM;

      // Handle Feb 29 for non-leap years
      if (targetM === 1 && targetD === 29 && !this.isLeapYear(todayY)) {
        thisYearD = 28;
      }

      const occurrenceThisYear = new Date(todayY, thisYearM, thisYearD, 0, 0, 0, 0);
      const msDiffThisYear = occurrenceThisYear.getTime() - todayMidnight.getTime();
      const daysDiffThisYear = Math.round(msDiffThisYear / (1000 * 60 * 60 * 24));

      if (daysDiffThisYear >= 0) {
        // Today or future occurrence this year
        return daysDiffThisYear;
      }

      // If already passed this year, compute next year
      const nextY = todayY + 1;
      let nextYearD = targetD;
      if (targetM === 1 && targetD === 29 && !this.isLeapYear(nextY)) {
        nextYearD = 28;
      }
      const occurrenceNextYear = new Date(nextY, thisYearM, nextYearD, 0, 0, 0, 0);
      const msDiffNextYear = occurrenceNextYear.getTime() - todayMidnight.getTime();
      return Math.round(msDiffNextYear / (1000 * 60 * 60 * 24));
    },

    // Format date string nicely according to current locale
    formatDate(dateStr) {
      if (!dateStr) return "";
      const parts = dateStr.split("-").map(Number);
      if (parts.length !== 3) return dateStr;
      const d = new Date(parts[0], parts[1] - 1, parts[2]);

      const locale = currentLang === "ky" ? "ky-KG" : "en-US";
      try {
        return d.toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch (e) {
        return `${parts[0]}-${String(parts[1]).padStart(2, "0")}-${String(parts[2]).padStart(2, "0")}`;
      }
    },

    // Format current date for home header badge
    getTodayFormatted() {
      const now = new Date();
      const locale = currentLang === "ky" ? "ky-KG" : "en-US";
      try {
        return now.toLocaleDateString(locale, {
          weekday: "short",
          month: "long",
          day: "numeric",
        });
      } catch (e) {
        return now.toDateString();
      }
    }
  };

  // =========================================================================
  // 9. EVENT COUNTDOWN MODULE
  // =========================================================================
  const EventsModule = {
    events: [],
    currentFilter: "all",

    init() {
      this.events = Storage.get(STORAGE_KEYS.EVENTS, []);

      // Add Event Button (Section & Quick action)
      const addBtn = document.getElementById("btn-add-event");
      if (addBtn) addBtn.addEventListener("click", () => this.openAddModal());

      const quickAddBtn = document.getElementById("btn-quick-add-event");
      if (quickAddBtn) quickAddBtn.addEventListener("click", () => this.openAddModal());

      // Filter tabs
      document.querySelectorAll(".filter-tab[data-filter]").forEach(tab => {
        tab.addEventListener("click", () => {
          this.currentFilter = tab.getAttribute("data-filter");
          document.querySelectorAll(".filter-tab[data-filter]").forEach(t => {
            const isActive = t === tab;
            t.classList.toggle("active", isActive);
            t.setAttribute("aria-selected", isActive ? "true" : "false");
          });
          this.render();
        });
      });

      // Accent color picker & presets
      const accentPicker = document.getElementById("event-accent-picker");
      const presetPills = document.querySelectorAll(".color-preset-pill");
      presetPills.forEach(pill => {
        pill.addEventListener("click", () => {
          presetPills.forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
          const c = pill.getAttribute("data-color");
          if (accentPicker) accentPicker.value = c;
        });
      });
      if (accentPicker) {
        accentPicker.addEventListener("input", (e) => {
          presetPills.forEach(p => p.classList.remove("active"));
        });
      }

      // Event Form Submission
      const form = document.getElementById("form-event");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleFormSubmit();
        });
      }

      // Clear errors on input
      const nameInput = document.getElementById("event-name");
      const dateInput = document.getElementById("event-date");
      if (nameInput) {
        nameInput.addEventListener("input", () => {
          document.getElementById("error-event-name").textContent = "";
        });
      }
      if (dateInput) {
        dateInput.addEventListener("input", () => {
          document.getElementById("error-event-date").textContent = "";
        });
      }

      // Re-evaluate countdowns periodically and on visibility focus
      window.addEventListener("focus", () => this.render());
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) this.render();
      });
      setInterval(() => this.render(), 60000);
    },

    openAddModal() {
      const modal = document.getElementById("modal-event");
      if (!modal) return;
      document.getElementById("modal-event-title").textContent = t("modalAddEventTitle");
      document.getElementById("event-id").value = "";
      document.getElementById("event-name").value = "";
      document.getElementById("event-date").value = "";
      document.getElementById("event-category").value = "birthday";
      document.getElementById("event-emoji").value = "🎂";
      document.getElementById("event-accent-picker").value = "#7C3AED";
      document.getElementById("event-repeat-annual").checked = false;
      document.getElementById("event-note").value = "";
      document.getElementById("error-event-name").textContent = "";
      document.getElementById("error-event-date").textContent = "";

      // Category change updates default emoji
      const catSelect = document.getElementById("event-category");
      catSelect.onchange = () => {
        const emojiMap = { birthday: "🎂", trip: "✈️", exam: "📝", celebration: "🎉", other: "📌" };
        document.getElementById("event-emoji").value = emojiMap[catSelect.value] || "📅";
      };

      Modals.open("modal-event");
    },

    openEditModal(id) {
      const event = this.events.find(e => e.id === id);
      if (!event) return;

      document.getElementById("modal-event-title").textContent = t("modalEditEventTitle");
      document.getElementById("event-id").value = event.id;
      document.getElementById("event-name").value = event.name;
      document.getElementById("event-date").value = event.targetDate;
      document.getElementById("event-category").value = event.category || "other";
      document.getElementById("event-emoji").value = event.emoji || "📅";
      document.getElementById("event-accent-picker").value = event.accentColor || "#7C3AED";
      document.getElementById("event-repeat-annual").checked = !!event.repeatAnnual;
      document.getElementById("event-note").value = event.note || "";
      document.getElementById("error-event-name").textContent = "";
      document.getElementById("error-event-date").textContent = "";

      Modals.open("modal-event");
    },

    handleFormSubmit() {
      const id = document.getElementById("event-id").value;
      const name = document.getElementById("event-name").value.trim();
      const targetDate = document.getElementById("event-date").value;
      const category = document.getElementById("event-category").value;
      const emoji = document.getElementById("event-emoji").value.trim() || "📅";
      const accentColor = document.getElementById("event-accent-picker").value;
      const repeatAnnual = document.getElementById("event-repeat-annual").checked;
      const note = document.getElementById("event-note").value.trim();

      let hasError = false;
      if (!name) {
        document.getElementById("error-event-name").textContent = t("errorEventNameRequired");
        hasError = true;
      }
      if (!targetDate) {
        document.getElementById("error-event-date").textContent = t("errorEventDateRequired");
        hasError = true;
      }

      if (hasError) return;

      if (id) {
        // Edit existing
        const idx = this.events.findIndex(e => e.id === id);
        if (idx !== -1) {
          this.events[idx] = {
            ...this.events[idx],
            name,
            targetDate,
            category,
            emoji,
            accentColor,
            repeatAnnual,
            note,
            updatedAt: Date.now(),
          };
        }
      } else {
        // Add new
        const newEvent = {
          id: "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
          name,
          targetDate,
          category,
          emoji,
          accentColor,
          repeatAnnual,
          note,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        this.events.unshift(newEvent);
      }

      if (Storage.set(STORAGE_KEYS.EVENTS, this.events)) {
        Modals.close("modal-event");
        this.render();
        Dashboard.render();
        Toasts.show(id ? t("btnSave") : t("quickAddEvent"), "success");
      }
    },

    deleteEvent(id) {
      showConfirm(t("confirmDeleteEvent"), () => {
        this.events = this.events.filter(e => e.id !== id);
        Storage.set(STORAGE_KEYS.EVENTS, this.events);
        this.render();
        Dashboard.render();
        Toasts.show(t("btnDelete"), "info");
      });
    },

    getUpcomingEvents() {
      return this.events
        .map(e => ({ ...e, daysDiff: DateUtils.diffInDays(e.targetDate, e.repeatAnnual) }))
        .filter(e => e.daysDiff >= 0)
        .sort((a, b) => a.daysDiff - b.daysDiff);
    },

    getPastEvents() {
      return this.events
        .map(e => ({ ...e, daysDiff: DateUtils.diffInDays(e.targetDate, e.repeatAnnual) }))
        .filter(e => e.daysDiff < 0)
        .sort((a, b) => b.daysDiff - a.daysDiff); // Most recent past first (-1 before -10)
    },

    render() {
      const container = document.getElementById("events-container");
      if (!container) return;

      // Update badge counts on tabs
      const upcoming = this.getUpcomingEvents();
      const past = this.getPastEvents();

      const bAll = document.getElementById("badge-events-all");
      const bUpcoming = document.getElementById("badge-events-upcoming");
      const bPast = document.getElementById("badge-events-past");
      if (bAll) bAll.textContent = this.events.length;
      if (bUpcoming) bUpcoming.textContent = upcoming.length;
      if (bPast) bPast.textContent = past.length;

      let displayList = [];
      if (this.currentFilter === "upcoming") {
        displayList = upcoming;
      } else if (this.currentFilter === "past") {
        displayList = past;
      } else {
        // "all": show upcoming first sorted by days, followed by past
        displayList = [...upcoming, ...past];
      }

      if (displayList.length === 0) {
        container.innerHTML = `
          <div class="empty-state-card" style="grid-column: 1 / -1;">
            <div class="empty-icon" aria-hidden="true">📅</div>
            <div class="empty-title">${t("emptyEventsList")}</div>
            <div class="empty-subtitle">${t("emptyEventsListDesc")}</div>
            <button type="button" class="btn btn-primary" style="margin-top:16px;" id="btn-empty-add-event">
              ${t("addEventBtn")}
            </button>
          </div>
        `;
        const emptyBtn = document.getElementById("btn-empty-add-event");
        if (emptyBtn) emptyBtn.addEventListener("click", () => this.openAddModal());
        return;
      }

      container.innerHTML = "";
      displayList.forEach(event => {
        const card = this.createEventCard(event);
        container.appendChild(card);
      });
    },

    createEventCard(event) {
      const card = document.createElement("div");
      card.className = "card event-card";
      card.id = `event-card-${event.id}`;
      card.style.borderLeftColor = event.accentColor || "var(--primary)";

      const daysDiff = event.daysDiff !== undefined ? event.daysDiff : DateUtils.diffInDays(event.targetDate, event.repeatAnnual);

      let badgeClass = "badge-upcoming";
      let numberText = "";
      let labelText = "";

      if (daysDiff === 0) {
        badgeClass = "badge-today";
        numberText = "🎉";
        labelText = t("countdownToday");
      } else if (daysDiff === 1) {
        badgeClass = "badge-urgent";
        numberText = "1";
        labelText = t("countdownTomorrow");
      } else if (daysDiff > 1) {
        badgeClass = daysDiff <= 7 ? "badge-urgent" : "badge-upcoming";
        numberText = daysDiff;
        labelText = t("countdownDaysRemaining");
      } else if (daysDiff === -1) {
        badgeClass = "badge-past";
        numberText = "1";
        labelText = t("countdownYesterday");
      } else {
        badgeClass = "badge-past";
        numberText = Math.abs(daysDiff);
        labelText = t("countdownDaysAgo");
      }

      const formattedDate = DateUtils.formatDate(event.targetDate);
      const categoryKey = "category" + (event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : "Other");
      const categoryLabel = t(categoryKey) || event.category;

      card.innerHTML = `
        <div class="event-card-header">
          <div class="event-main-info">
            <div class="event-emoji-box" aria-hidden="true">${escapeHtml(event.emoji || "📅")}</div>
            <div class="event-title-wrap">
              <h3 class="event-name">${escapeHtml(event.name)}</h3>
              <div class="event-date-text">${formattedDate}</div>
              ${event.repeatAnnual ? `<span class="event-repeat-badge">🔁 ${t("repeatAnnualBadge")}</span>` : ""}
            </div>
          </div>
          <div class="event-countdown-badge ${badgeClass}" aria-label="${numberText} ${labelText}">
            <span class="countdown-number">${numberText}</span>
            <span class="countdown-label">${labelText}</span>
          </div>
        </div>

        ${event.note ? `<div class="event-note-box">${escapeHtml(event.note)}</div>` : ""}

        <div class="event-footer">
          <span class="event-category-pill">${categoryLabel}</span>
          <div class="event-card-actions">
            <button type="button" class="btn-card-action" data-edit-event="${event.id}" title="${t("btnEdit")}" aria-label="${t("btnEdit")} ${escapeHtml(event.name)}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button type="button" class="btn-card-action btn-action-delete" data-delete-event="${event.id}" title="${t("btnDelete")}" aria-label="${t("btnDelete")} ${escapeHtml(event.name)}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      `;

      card.querySelector("[data-edit-event]").addEventListener("click", () => this.openEditModal(event.id));
      card.querySelector("[data-delete-event]").addEventListener("click", () => this.deleteEvent(event.id));

      return card;
    }
  };

  // =========================================================================
  // 10. COLOR PALETTE GENERATOR MODULE
  // =========================================================================
  const PaletteModule = {
    // Current active 5 swatches
    currentColors: [
      { hex: "#7C3AED", locked: false },
      { hex: "#3B82F6", locked: false },
      { hex: "#10B981", locked: false },
      { hex: "#F59E0B", locked: false },
      { hex: "#EF4444", locked: false },
    ],
    savedPalettes: [],

    init() {
      this.savedPalettes = Storage.get(STORAGE_KEYS.PALETTES, []);

      // Generate Palette button
      const genBtn = document.getElementById("btn-generate-palette");
      if (genBtn) genBtn.addEventListener("click", () => this.generatePalette());

      // Quick generate from dashboard
      const quickGenBtn = document.getElementById("btn-quick-generate-palette");
      if (quickGenBtn) {
        quickGenBtn.addEventListener("click", () => {
          Navigation.switchTab("colors");
          this.generatePalette();
        });
      }

      // Copy All button
      const copyAllBtn = document.getElementById("btn-copy-all-colors");
      if (copyAllBtn) copyAllBtn.addEventListener("click", () => this.copyAllColors());

      // Save Palette button & form
      const saveBtn = document.getElementById("btn-save-current-palette");
      if (saveBtn) saveBtn.addEventListener("click", () => this.openSaveModal());

      const formSave = document.getElementById("form-save-palette");
      if (formSave) {
        formSave.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleSavePalette();
        });
      }

      // Spacebar generation listener (only active on Colors tab and when not in form input)
      window.addEventListener("keydown", (e) => {
        if (e.code === "Space" && Navigation.activeTab === "colors" && !Modals.activeModal) {
          const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
          if (tag !== "input" && tag !== "textarea" && tag !== "select") {
            e.preventDefault();
            this.generatePalette();
          }
        }
      });

      this.render();
    },

    // Relative luminance calculation for optimal contrast
    getContrastColor(hex) {
      const cleanHex = hex.replace("#", "");
      if (cleanHex.length !== 6) return "#000000";
      const r = parseInt(cleanHex.substr(0, 2), 16) / 255;
      const g = parseInt(cleanHex.substr(2, 2), 16) / 255;
      const b = parseInt(cleanHex.substr(4, 2), 16) / 255;

      const a = [r, g, b].map(v => {
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      const lum = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
      return lum > 0.35 ? "#000000" : "#FFFFFF";
    },

    // Generate random hex color with good vibrancy
    randomHex() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    generatePalette() {
      const allLocked = this.currentColors.every(c => c.locked);
      const noticeEl = document.getElementById("all-locked-notice");

      if (allLocked) {
        if (noticeEl) noticeEl.style.display = "flex";
        Toasts.show(t("allColorsLockedNotice"), "info");
        return;
      }

      if (noticeEl) noticeEl.style.display = "none";

      this.currentColors = this.currentColors.map(swatch => {
        if (swatch.locked) return swatch;
        return { ...swatch, hex: this.randomHex() };
      });

      this.renderSwatches();
    },

    openSaveModal() {
      const modal = document.getElementById("modal-save-palette");
      if (!modal) return;

      const stripesEl = document.getElementById("modal-palette-color-stripes");
      if (stripesEl) {
        stripesEl.innerHTML = this.currentColors
          .map(c => `<div style="flex:1; background:${c.hex};"></div>`)
          .join("");
      }

      const defaultName = `${t("defaultPaletteNamePrefix")} #${this.savedPalettes.length + 1}`;
      const nameInput = document.getElementById("palette-name-input");
      if (nameInput) {
        nameInput.value = "";
        nameInput.placeholder = defaultName;
      }

      Modals.open("modal-save-palette");
    },

    handleSavePalette() {
      const nameInput = document.getElementById("palette-name-input");
      let name = nameInput.value.trim();
      if (!name) {
        name = `${t("defaultPaletteNamePrefix")} #${this.savedPalettes.length + 1}`;
      }

      const newPalette = {
        id: "pal_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
        name,
        colors: this.currentColors.map(c => c.hex),
        savedAt: Date.now(),
      };

      this.savedPalettes.unshift(newPalette);
      if (Storage.set(STORAGE_KEYS.PALETTES, this.savedPalettes)) {
        Modals.close("modal-save-palette");
        this.renderSavedPalettes();
        Dashboard.render();
        Toasts.show(t("toastPaletteSaved"), "success");
      }
    },

    deletePalette(id) {
      showConfirm(t("confirmDeletePalette"), () => {
        this.savedPalettes = this.savedPalettes.filter(p => p.id !== id);
        Storage.set(STORAGE_KEYS.PALETTES, this.savedPalettes);
        this.renderSavedPalettes();
        Dashboard.render();
        Toasts.show(t("toastPaletteDeleted"), "info");
      });
    },

    loadPaletteIntoEditor(id) {
      const pal = this.savedPalettes.find(p => p.id === id);
      if (!pal || !pal.colors) return;

      this.currentColors = pal.colors.map(hex => ({ hex, locked: false }));
      this.renderSwatches();
      window.scrollTo({ top: 0, behavior: "smooth" });
      Toasts.show(`${pal.name} ${t("btnOpenInEditor")}`, "info");
    },

    copyAllColors() {
      const text = this.currentColors.map(c => c.hex.toUpperCase()).join(", ");
      this.copyToClipboard(text, t("toastAllColorsCopied"));
    },

    copySingleColor(hex) {
      this.copyToClipboard(hex.toUpperCase(), `${t("toastColorCopied")}${hex.toUpperCase()}`);
    },

    // Secure context clipboard with manual copy fallback dialog
    copyToClipboard(text, successMessage) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(() => {
            Toasts.show(successMessage, "success");
          })
          .catch(() => {
            this.showManualCopyModal(text);
          });
      } else {
        this.showManualCopyModal(text);
      }
    },

    showManualCopyModal(text) {
      const textarea = document.getElementById("manual-copy-textarea");
      if (textarea) {
        textarea.value = text;
        Modals.open("modal-manual-copy");
        setTimeout(() => {
          textarea.focus();
          textarea.select();
        }, 100);
      }
    },

    render() {
      this.renderSwatches();
      this.renderSavedPalettes();
    },

    renderSwatches() {
      const board = document.getElementById("palette-swatches-board");
      if (!board) return;

      board.innerHTML = "";
      this.currentColors.forEach((swatch, index) => {
        const contrastText = this.getContrastColor(swatch.hex);
        const swatchEl = document.createElement("div");
        swatchEl.className = "color-swatch";
        swatchEl.style.backgroundColor = swatch.hex;
        swatchEl.setAttribute("data-swatch-index", index);

        swatchEl.innerHTML = `
          <div class="swatch-overlay-content">
            <span class="swatch-hex-text" style="color: ${contrastText};">${swatch.hex.toUpperCase()}</span>
            <div class="swatch-actions-row">
              <button type="button" class="swatch-btn btn-copy-swatch" title="${t("btnCopy")}" aria-label="${t("btnCopy")} ${swatch.hex}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>

              <button type="button" class="swatch-btn btn-lock-swatch ${swatch.locked ? "locked" : ""}" title="${swatch.locked ? t("btnUnlock") : t("btnLock")}" aria-label="${swatch.locked ? t("btnUnlock") : t("btnLock")}">
                ${swatch.locked 
                  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>` 
                  : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`
                }
              </button>

              <div class="swatch-color-input-wrapper" title="${t("colorsTitle")}">
                <input type="color" class="swatch-color-input" value="${swatch.hex}" aria-label="Түс тандоо">
                <div class="swatch-color-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                </div>
              </div>
            </div>
          </div>
        `;

        // Event listeners
        swatchEl.querySelector(".btn-copy-swatch").addEventListener("click", (e) => {
          e.stopPropagation();
          this.copySingleColor(swatch.hex);
        });

        swatchEl.querySelector(".btn-lock-swatch").addEventListener("click", (e) => {
          e.stopPropagation();
          this.currentColors[index].locked = !this.currentColors[index].locked;
          this.renderSwatches();
        });

        const colorInput = swatchEl.querySelector(".swatch-color-input");
        colorInput.addEventListener("input", (e) => {
          this.currentColors[index].hex = e.target.value.toUpperCase();
          this.renderSwatches();
        });

        board.appendChild(swatchEl);
      });
    },

    renderSavedPalettes() {
      const container = document.getElementById("saved-palettes-container");
      const badgeCount = document.getElementById("badge-saved-palettes-count");
      if (badgeCount) badgeCount.textContent = this.savedPalettes.length;
      if (!container) return;

      if (this.savedPalettes.length === 0) {
        container.innerHTML = `
          <div class="empty-state-card" style="grid-column: 1 / -1;">
            <div class="empty-icon" aria-hidden="true">🎨</div>
            <div class="empty-title">${t("emptySavedPalettesList")}</div>
            <div class="empty-subtitle">${t("emptySavedPalettesListDesc")}</div>
          </div>
        `;
        return;
      }

      container.innerHTML = "";
      this.savedPalettes.forEach(pal => {
        const card = document.createElement("div");
        card.className = "card saved-palette-card";

        const formattedDate = new Date(pal.savedAt).toLocaleDateString(currentLang === "ky" ? "ky-KG" : "en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });

        const stripesHtml = (pal.colors || []).map(hex => `<div class="saved-palette-bar" style="background:${hex};" title="${hex}"></div>`).join("");

        card.innerHTML = `
          <div class="saved-palette-colors-row" aria-label="Палитра түстөрү">${stripesHtml}</div>
          <div class="saved-palette-info">
            <span class="saved-palette-name">${escapeHtml(pal.name)}</span>
            <span class="saved-palette-date">${formattedDate}</span>
          </div>
          <div class="saved-palette-actions">
            <button type="button" class="btn btn-outline" style="font-size:0.78rem; padding:4px 8px; min-height:30px;" data-open-palette="${pal.id}">
              ${t("btnOpenInEditor")}
            </button>
            <button type="button" class="btn-card-action" data-copy-palette="${pal.id}" title="${t("btnCopy")}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
            <button type="button" class="btn-card-action btn-action-delete" data-delete-palette="${pal.id}" title="${t("btnDelete")}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        `;

        card.querySelector("[data-open-palette]").addEventListener("click", () => this.loadPaletteIntoEditor(pal.id));
        card.querySelector("[data-copy-palette]").addEventListener("click", () => {
          const text = (pal.colors || []).join(", ");
          this.copyToClipboard(text, t("toastAllColorsCopied"));
        });
        card.querySelector("[data-delete-palette]").addEventListener("click", () => this.deletePalette(pal.id));

        container.appendChild(card);
      });
    }
  };

  // =========================================================================
  // 11. PERSONAL BOOKSHELF MODULE
  // =========================================================================
  const BooksModule = {
    books: [],
    searchQuery: "",
    statusFilter: "all",
    sortOrder: "recent",

    init() {
      this.books = Storage.get(STORAGE_KEYS.BOOKS, []);

      // Add Book Button
      const addBtn = document.getElementById("btn-add-book");
      if (addBtn) addBtn.addEventListener("click", () => this.openAddModal());

      const quickAddBtn = document.getElementById("btn-quick-add-book");
      if (quickAddBtn) quickAddBtn.addEventListener("click", () => this.openAddModal());

      // Search input & clear button
      const searchInput = document.getElementById("input-search-books");
      const clearSearchBtn = document.getElementById("btn-clear-search");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          if (clearSearchBtn) clearSearchBtn.style.display = this.searchQuery ? "block" : "none";
          this.render();
        });
      }
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
          searchInput.value = "";
          this.searchQuery = "";
          clearSearchBtn.style.display = "none";
          this.render();
        });
      }

      // Status filter pills
      document.querySelectorAll(".filter-pill[data-status-filter]").forEach(pill => {
        pill.addEventListener("click", () => {
          this.statusFilter = pill.getAttribute("data-status-filter");
          document.querySelectorAll(".filter-pill[data-status-filter]").forEach(p => {
            const isActive = p === pill;
            p.classList.toggle("active", isActive);
            p.setAttribute("aria-selected", isActive ? "true" : "false");
          });
          this.render();
        });
      });

      // Sort Dropdown
      const sortSelect = document.getElementById("select-sort-books");
      if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
          this.sortOrder = e.target.value;
          this.render();
        });
      }

      // Add/Edit Book Form
      const formBook = document.getElementById("form-book");
      if (formBook) {
        formBook.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleBookFormSubmit();
        });
      }

      // Quick Progress Form & Steppers
      const formProgress = document.getElementById("form-quick-progress");
      if (formProgress) {
        formProgress.addEventListener("submit", (e) => {
          e.preventDefault();
          this.handleQuickProgressSubmit();
        });
      }

      this.initQuickProgressSteppers();
      this.initConsistencyFormListeners();

      this.render();
    },

    // Consistency rules: Want to Read => pagesRead=0, Finished => pagesRead=totalPages, etc.
    initConsistencyFormListeners() {
      const statusSelect = document.getElementById("book-status");
      const totalPagesInput = document.getElementById("book-total-pages");
      const pagesReadInput = document.getElementById("book-pages-read");

      if (statusSelect && totalPagesInput && pagesReadInput) {
        statusSelect.addEventListener("change", () => {
          const status = statusSelect.value;
          const total = parseInt(totalPagesInput.value, 10) || 0;
          if (status === "want_to_read") {
            pagesReadInput.value = 0;
          } else if (status === "finished" && total > 0) {
            pagesReadInput.value = total;
          }
        });

        pagesReadInput.addEventListener("input", () => {
          const read = parseInt(pagesReadInput.value, 10);
          const total = parseInt(totalPagesInput.value, 10);
          if (!isNaN(read) && !isNaN(total) && total > 0) {
            if (read >= total) {
              statusSelect.value = "finished";
            } else if (read > 0 && statusSelect.value === "finished") {
              statusSelect.value = "reading";
            } else if (read === 0 && statusSelect.value === "finished") {
              statusSelect.value = "want_to_read";
            }
          }
        });
      }
    },

    initQuickProgressSteppers() {
      const input = document.getElementById("quick-progress-page-input");
      const fill = document.getElementById("quick-progress-bar-fill");
      const percentEl = document.getElementById("quick-progress-percent");

      const updateVisuals = (newVal, total) => {
        input.value = newVal;
        const pct = total > 0 ? Math.min(100, Math.round((newVal / total) * 100)) : 0;
        if (fill) fill.style.width = pct + "%";
        if (percentEl) percentEl.textContent = pct + "%";
      };

      const step = (amount) => {
        const bookId = document.getElementById("quick-progress-book-id").value;
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        let cur = parseInt(input.value, 10) || 0;
        cur = Math.max(0, Math.min(book.totalPages, cur + amount));
        updateVisuals(cur, book.totalPages);
      };

      document.getElementById("btn-step-minus-10").addEventListener("click", () => step(-10));
      document.getElementById("btn-step-minus-1").addEventListener("click", () => step(-1));
      document.getElementById("btn-step-plus-1").addEventListener("click", () => step(1));
      document.getElementById("btn-step-plus-10").addEventListener("click", () => step(10));

      if (input) {
        input.addEventListener("input", () => {
          const bookId = document.getElementById("quick-progress-book-id").value;
          const book = this.books.find(b => b.id === bookId);
          if (!book) return;
          const val = parseInt(input.value, 10) || 0;
          updateVisuals(val, book.totalPages);
        });
      }
    },

    openAddModal() {
      document.getElementById("modal-book-title").textContent = t("modalAddBookTitle");
      document.getElementById("book-id").value = "";
      document.getElementById("book-title").value = "";
      document.getElementById("book-author").value = "";
      document.getElementById("book-total-pages").value = "";
      document.getElementById("book-pages-read").value = "0";
      document.getElementById("book-status").value = "reading";
      document.getElementById("book-rating").value = "0";
      document.getElementById("book-cover-url").value = "";
      document.getElementById("book-notes").value = "";
      document.getElementById("error-book-title").textContent = "";
      document.getElementById("error-book-total-pages").textContent = "";
      document.getElementById("error-book-pages-read").textContent = "";

      Modals.open("modal-book");
    },

    openEditModal(id) {
      const book = this.books.find(b => b.id === id);
      if (!book) return;

      document.getElementById("modal-book-title").textContent = t("modalEditBookTitle");
      document.getElementById("book-id").value = book.id;
      document.getElementById("book-title").value = book.title;
      document.getElementById("book-author").value = book.author || "";
      document.getElementById("book-total-pages").value = book.totalPages;
      document.getElementById("book-pages-read").value = book.pagesRead;
      document.getElementById("book-status").value = book.status;
      document.getElementById("book-rating").value = book.rating || "0";
      document.getElementById("book-cover-url").value = book.coverUrl || "";
      document.getElementById("book-notes").value = book.notes || "";
      document.getElementById("error-book-title").textContent = "";
      document.getElementById("error-book-total-pages").textContent = "";
      document.getElementById("error-book-pages-read").textContent = "";

      Modals.open("modal-book");
    },

    openQuickProgressModal(id) {
      const book = this.books.find(b => b.id === id);
      if (!book) return;

      document.getElementById("quick-progress-book-id").value = book.id;
      document.getElementById("quick-progress-book-title").textContent = book.title;
      document.getElementById("quick-progress-page-input").value = book.pagesRead;
      document.getElementById("quick-progress-total-display").textContent = `/ ${book.totalPages} ${t("pagesUnit")}`;
      document.getElementById("error-quick-progress").textContent = "";

      const pct = Math.min(100, Math.round((book.pagesRead / book.totalPages) * 100));
      document.getElementById("quick-progress-bar-fill").style.width = pct + "%";
      document.getElementById("quick-progress-percent").textContent = pct + "%";

      Modals.open("modal-quick-progress");
    },

    handleQuickProgressSubmit() {
      const id = document.getElementById("quick-progress-book-id").value;
      const input = document.getElementById("quick-progress-page-input");
      const errEl = document.getElementById("error-quick-progress");

      const book = this.books.find(b => b.id === id);
      if (!book) return;

      const newRead = parseInt(input.value, 10);
      if (isNaN(newRead) || newRead < 0 || newRead > book.totalPages) {
        errEl.textContent = t("errorBookPagesReadRange");
        return;
      }

      book.pagesRead = newRead;
      // Auto-update status according to progress consistency rules
      if (book.pagesRead === book.totalPages) {
        book.status = "finished";
      } else if (book.pagesRead > 0 && book.status === "finished") {
        book.status = "reading";
      } else if (book.pagesRead === 0 && book.status === "finished") {
        book.status = "want_to_read";
      }
      book.updatedAt = Date.now();

      if (Storage.set(STORAGE_KEYS.BOOKS, this.books)) {
        Modals.close("modal-quick-progress");
        this.render();
        Dashboard.render();
        Toasts.show(t("btnSaveProgress"), "success");
      }
    },

    handleBookFormSubmit() {
      const id = document.getElementById("book-id").value;
      const title = document.getElementById("book-title").value.trim();
      const author = document.getElementById("book-author").value.trim();
      const totalPages = parseInt(document.getElementById("book-total-pages").value, 10);
      let pagesRead = parseInt(document.getElementById("book-pages-read").value, 10);
      let status = document.getElementById("book-status").value;
      const rating = parseInt(document.getElementById("book-rating").value, 10) || 0;
      const coverUrl = document.getElementById("book-cover-url").value.trim();
      const notes = document.getElementById("book-notes").value.trim();

      let hasError = false;
      if (!title) {
        document.getElementById("error-book-title").textContent = t("errorBookTitleRequired");
        hasError = true;
      }
      if (isNaN(totalPages) || totalPages <= 0) {
        document.getElementById("error-book-total-pages").textContent = t("errorBookTotalPagesRequired");
        hasError = true;
      }
      if (isNaN(pagesRead) || pagesRead < 0 || pagesRead > totalPages) {
        document.getElementById("error-book-pages-read").textContent = t("errorBookPagesReadRange");
        hasError = true;
      }

      if (hasError) return;

      // Consistency enforcement
      if (status === "want_to_read") {
        pagesRead = 0;
      } else if (status === "finished") {
        pagesRead = totalPages;
      } else if (pagesRead === totalPages) {
        status = "finished";
      }

      if (id) {
        const idx = this.books.findIndex(b => b.id === id);
        if (idx !== -1) {
          this.books[idx] = {
            ...this.books[idx],
            title,
            author,
            totalPages,
            pagesRead,
            status,
            rating,
            coverUrl,
            notes,
            updatedAt: Date.now(),
          };
        }
      } else {
        const newBook = {
          id: "bk_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
          title,
          author,
          totalPages,
          pagesRead,
          status,
          rating,
          coverUrl,
          notes,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        this.books.unshift(newBook);
      }

      if (Storage.set(STORAGE_KEYS.BOOKS, this.books)) {
        Modals.close("modal-book");
        this.render();
        Dashboard.render();
        Toasts.show(id ? t("btnSave") : t("quickAddBook"), "success");
      }
    },

    deleteBook(id) {
      showConfirm(t("confirmDeleteBook"), () => {
        this.books = this.books.filter(b => b.id !== id);
        Storage.set(STORAGE_KEYS.BOOKS, this.books);
        this.render();
        Dashboard.render();
        Toasts.show(t("btnDelete"), "info");
      });
    },

    render() {
      this.updateStats();
      const container = document.getElementById("books-container");
      if (!container) return;

      let filtered = [...this.books];

      // Status filter
      if (this.statusFilter !== "all") {
        filtered = filtered.filter(b => b.status === this.statusFilter);
      }

      // Search query
      if (this.searchQuery) {
        filtered = filtered.filter(b => {
          const tMatch = b.title && b.title.toLowerCase().includes(this.searchQuery);
          const aMatch = b.author && b.author.toLowerCase().includes(this.searchQuery);
          return tMatch || aMatch;
        });
      }

      // Sort
      if (this.sortOrder === "title") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortOrder === "rating") {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (this.sortOrder === "progress") {
        filtered.sort((a, b) => (b.pagesRead / b.totalPages) - (a.pagesRead / a.totalPages));
      } else {
        // "recent"
        filtered.sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0));
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="empty-state-card" style="grid-column: 1 / -1;">
            <div class="empty-icon" aria-hidden="true">📚</div>
            <div class="empty-title">${t("emptyBooksList")}</div>
            <div class="empty-subtitle">${t("emptyBooksListDesc")}</div>
            <button type="button" class="btn btn-primary" style="margin-top:16px;" id="btn-empty-add-book">
              ${t("addBookBtn")}
            </button>
          </div>
        `;
        const emptyBtn = document.getElementById("btn-empty-add-book");
        if (emptyBtn) emptyBtn.addEventListener("click", () => this.openAddModal());
        return;
      }

      container.innerHTML = "";
      filtered.forEach(book => {
        const card = this.createBookCard(book);
        container.appendChild(card);
      });
    },

    updateStats() {
      const total = this.books.length;
      const reading = this.books.filter(b => b.status === "reading").length;
      const finished = this.books.filter(b => b.status === "finished").length;
      const totalPagesRead = this.books.reduce((sum, b) => sum + (parseInt(b.pagesRead, 10) || 0), 0);

      const elTotal = document.getElementById("book-stat-total");
      const elReading = document.getElementById("book-stat-reading");
      const elFinished = document.getElementById("book-stat-finished");
      const elPages = document.getElementById("book-stat-pages");

      if (elTotal) elTotal.textContent = total;
      if (elReading) elReading.textContent = reading;
      if (elFinished) elFinished.textContent = finished;
      if (elPages) elPages.textContent = totalPagesRead;
    },

    createBookCard(book) {
      const card = document.createElement("div");
      card.className = "card book-card";
      card.id = `book-card-${book.id}`;

      const pct = book.totalPages > 0 ? Math.min(100, Math.round((book.pagesRead / book.totalPages) * 100)) : 0;
      
      const statusKey = "status" + (book.status === "want_to_read" ? "WantToRead" : (book.status === "reading" ? "Reading" : "Finished"));
      const statusLabel = t(statusKey);

      // Star rating representation
      let ratingHtml = "";
      if (book.rating && book.rating > 0) {
        ratingHtml = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);
      } else {
        ratingHtml = `<span style="color:var(--text-muted); font-size:0.75rem;">${t("ratingUnrated")}</span>`;
      }

      // Book cover generation (image or styled placeholder)
      let coverHtml = "";
      if (book.coverUrl) {
        coverHtml = `
          <img src="${escapeHtml(book.coverUrl)}" alt="${escapeHtml(book.title)}" class="book-card-cover-img" onerror="this.parentElement.innerHTML = '${this.generatePlaceholderCoverHtml(book)}'">
        `;
      } else {
        coverHtml = this.generatePlaceholderCoverHtml(book);
      }

      card.innerHTML = `
        <div class="book-card-cover-wrap">${coverHtml}</div>
        <div class="book-card-details">
          <div class="book-card-top">
            <span class="book-status-pill status-${book.status}">${statusLabel}</span>
            <h3 class="book-title">${escapeHtml(book.title)}</h3>
            ${book.author ? `<div class="book-author">${escapeHtml(book.author)}</div>` : ""}
            <div class="book-rating-stars">${ratingHtml}</div>
          </div>

          <div class="book-progress-section">
            <div class="book-progress-header">
              <span>${book.pagesRead} / ${book.totalPages} ${t("pagesUnit")}</span>
              <span>${pct}%</span>
            </div>
            <div class="progress-bar-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>

          <div class="book-card-actions">
            <button type="button" class="btn-update-progress" data-quick-progress="${book.id}">
              ${t("btnUpdateProgress")}
            </button>
            <div style="display:flex; gap:4px;">
              <button type="button" class="btn-card-action" data-edit-book="${book.id}" title="${t("btnEdit")}" aria-label="${t("btnEdit")} ${escapeHtml(book.title)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
              <button type="button" class="btn-card-action btn-action-delete" data-delete-book="${book.id}" title="${t("btnDelete")}" aria-label="${t("btnDelete")} ${escapeHtml(book.title)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;

      card.querySelector("[data-quick-progress]").addEventListener("click", () => this.openQuickProgressModal(book.id));
      card.querySelector("[data-edit-book]").addEventListener("click", () => this.openEditModal(book.id));
      card.querySelector("[data-delete-book]").addEventListener("click", () => this.deleteBook(book.id));

      return card;
    },

    generatePlaceholderCoverHtml(book) {
      const initials = (book.author || "Book")
        .split(" ")
        .map(w => w.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

      return `
        <div class="book-cover-placeholder">
          <div class="book-placeholder-title">${escapeHtml(book.title)}</div>
          <div class="book-placeholder-initials">${initials}</div>
        </div>
      `;
    }
  };

  // =========================================================================
  // 12. DASHBOARD SPOTLIGHT & SUMMARIES
  // =========================================================================
  const Dashboard = {
    render() {
      // 1. Date header badge
      const todayEl = document.getElementById("home-today-date");
      if (todayEl) todayEl.textContent = DateUtils.getTodayFormatted();

      // 2. Summary counts
      const upcomingEvents = EventsModule.getUpcomingEvents();
      const savedPalettes = PaletteModule.savedPalettes;
      const readingBooks = BooksModule.books.filter(b => b.status === "reading");

      const sEvents = document.getElementById("stat-upcoming-events-count");
      const sPalettes = document.getElementById("stat-saved-palettes-count");
      const sBooks = document.getElementById("stat-reading-books-count");

      if (sEvents) sEvents.textContent = upcomingEvents.length;
      if (sPalettes) sPalettes.textContent = savedPalettes.length;
      if (sBooks) sBooks.textContent = readingBooks.length;

      // 3. Highlight 1: Nearest Upcoming Event
      const eventContent = document.getElementById("highlight-event-content");
      if (eventContent) {
        if (upcomingEvents.length > 0) {
          const nearest = upcomingEvents[0];
          const days = nearest.daysDiff;
          const daysText = days === 0 ? t("countdownToday") : (days === 1 ? t("countdownTomorrow") : `${days} ${t("countdownDaysRemaining")}`);

          eventContent.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px; cursor:pointer;" id="dash-nearest-event-preview">
              <div class="event-emoji-box" aria-hidden="true">${escapeHtml(nearest.emoji || "📅")}</div>
              <div style="flex:1;">
                <div style="font-weight:700; font-size:1.05rem;">${escapeHtml(nearest.name)}</div>
                <div style="font-size:0.85rem; color:var(--text-muted);">${DateUtils.formatDate(nearest.targetDate)}</div>
              </div>
              <div class="event-countdown-badge ${days === 0 ? "badge-today" : (days <= 7 ? "badge-urgent" : "badge-upcoming")}">
                <span class="countdown-number">${days === 0 ? "🎉" : days}</span>
                <span class="countdown-label">${daysText}</span>
              </div>
            </div>
          `;
          document.getElementById("dash-nearest-event-preview").addEventListener("click", () => {
            Navigation.switchTab("events");
          });
        } else {
          eventContent.innerHTML = `
            <div class="empty-state-card" style="padding:16px 8px;">
              <div class="empty-title">${t("emptyNoUpcomingEvents")}</div>
              <div class="empty-subtitle">${t("emptyNoUpcomingEventsDesc")}</div>
            </div>
          `;
        }
      }

      // 4. Highlight 2: Latest Saved Palette
      const paletteContent = document.getElementById("highlight-palette-content");
      if (paletteContent) {
        if (savedPalettes.length > 0) {
          const latest = savedPalettes[0];
          const stripes = (latest.colors || []).map(hex => `<div style="flex:1; background:${hex};" title="${hex}"></div>`).join("");

          paletteContent.innerHTML = `
            <div style="cursor:pointer;" id="dash-latest-palette-preview">
              <div style="display:flex; height:50px; border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border-subtle); margin-bottom:10px;">
                ${stripes}
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; font-size:0.95rem;">${escapeHtml(latest.name)}</span>
                <span style="font-size:0.8rem; color:var(--primary); font-weight:600;">${t("btnOpenInEditor")} →</span>
              </div>
            </div>
          `;
          document.getElementById("dash-latest-palette-preview").addEventListener("click", () => {
            Navigation.switchTab("colors");
            PaletteModule.loadPaletteIntoEditor(latest.id);
          });
        } else {
          paletteContent.innerHTML = `
            <div class="empty-state-card" style="padding:16px 8px;">
              <div class="empty-title">${t("emptyNoSavedPalettes")}</div>
              <div class="empty-subtitle">${t("emptyNoSavedPalettesDesc")}</div>
            </div>
          `;
        }
      }

      // 5. Highlight 3: Active Book Reading
      const bookContent = document.getElementById("highlight-book-content");
      if (bookContent) {
        // Most recently updated book currently being read
        const activeBook = readingBooks.sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0))[0];

        if (activeBook) {
          const pct = Math.min(100, Math.round((activeBook.pagesRead / activeBook.totalPages) * 100));

          bookContent.innerHTML = `
            <div style="display:flex; gap:12px; align-items:center; cursor:pointer;" id="dash-active-book-preview">
              <div style="width:50px; height:70px; flex-shrink:0;">
                ${BooksModule.generatePlaceholderCoverHtml(activeBook)}
              </div>
              <div style="flex:1;">
                <div style="font-weight:700; font-size:0.98rem; line-height:1.2;">${escapeHtml(activeBook.title)}</div>
                <div style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">${escapeHtml(activeBook.author || "")}</div>
                <div style="margin-top:6px;">
                  <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-bottom:3px;">
                    <span>${activeBook.pagesRead} / ${activeBook.totalPages} ${t("pagesUnit")}</span>
                    <span>${pct}%</span>
                  </div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill" style="width:${pct}%;"></div>
                  </div>
                </div>
              </div>
            </div>
          `;
          document.getElementById("dash-active-book-preview").addEventListener("click", () => {
            Navigation.switchTab("books");
          });
        } else {
          bookContent.innerHTML = `
            <div class="empty-state-card" style="padding:16px 8px;">
              <div class="empty-title">${t("emptyNoReadingBooks")}</div>
              <div class="empty-subtitle">${t("emptyNoReadingBooksDesc")}</div>
            </div>
          `;
        }
      }

      // Navigation shortcuts from summary cards & links
      const cEvents = document.getElementById("card-summary-events");
      const cPalettes = document.getElementById("card-summary-palettes");
      const cBooks = document.getElementById("card-summary-books");
      if (cEvents) cEvents.onclick = () => Navigation.switchTab("events");
      if (cPalettes) cPalettes.onclick = () => Navigation.switchTab("colors");
      if (cBooks) cBooks.onclick = () => Navigation.switchTab("books");

      const linkEvents = document.getElementById("link-view-all-events");
      const linkPalettes = document.getElementById("link-view-all-palettes");
      const linkBooks = document.getElementById("link-view-all-books");
      if (linkEvents) linkEvents.onclick = () => Navigation.switchTab("events");
      if (linkPalettes) linkPalettes.onclick = () => Navigation.switchTab("colors");
      if (linkBooks) linkBooks.onclick = () => Navigation.switchTab("books");
    }
  };

  // =========================================================================
  // 13. SETTINGS & DATA MANAGEMENT MODULE
  // =========================================================================
  const SettingsModule = {
    init() {
      // Export JSON Backup
      const exportBtn = document.getElementById("btn-export-data");
      if (exportBtn) {
        exportBtn.addEventListener("click", () => this.exportBackup());
      }

      // Import JSON Backup
      const importInput = document.getElementById("input-import-file");
      if (importInput) {
        importInput.addEventListener("change", (e) => this.handleImport(e));
      }

      // Delete All Application Data
      const deleteAllBtn = document.getElementById("btn-delete-all-data");
      if (deleteAllBtn) {
        deleteAllBtn.addEventListener("click", () => this.handleDeleteAll());
      }
    },

    exportBackup() {
      const backupData = {
        app: "Trio",
        version: 1,
        exportedAt: new Date().toISOString(),
        events: EventsModule.events,
        palettes: PaletteModule.savedPalettes,
        books: BooksModule.books,
        preferences: {
          lang: currentLang,
          theme: currentTheme,
        }
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement("a");
      const filename = `trio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      Toasts.show(t("toastDataExported"), "success");
    },

    handleImport(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);

          // Validation of structure and basic properties
          if (!parsed || typeof parsed !== "object" || parsed.app !== "Trio" || !Array.isArray(parsed.events) || !Array.isArray(parsed.palettes) || !Array.isArray(parsed.books)) {
            Toasts.show(t("toastInvalidBackup"), "error");
            e.target.value = "";
            return;
          }

          showConfirm(t("confirmImportReplace"), () => {
            // Apply imported records
            EventsModule.events = parsed.events;
            PaletteModule.savedPalettes = parsed.palettes;
            BooksModule.books = parsed.books;

            Storage.set(STORAGE_KEYS.EVENTS, parsed.events);
            Storage.set(STORAGE_KEYS.PALETTES, parsed.palettes);
            Storage.set(STORAGE_KEYS.BOOKS, parsed.books);

            if (parsed.preferences && parsed.preferences.lang) {
              ThemeAndLang.setLanguage(parsed.preferences.lang);
            }
            if (parsed.preferences && parsed.preferences.theme) {
              ThemeAndLang.setTheme(parsed.preferences.theme);
            }

            EventsModule.render();
            PaletteModule.render();
            BooksModule.render();
            Dashboard.render();

            Toasts.show(t("toastDataImported"), "success");
          });

        } catch (err) {
          console.error("Backup JSON parse failure:", err);
          Toasts.show(t("toastInvalidBackup"), "error");
        }
        e.target.value = "";
      };

      reader.readAsText(file);
    },

    handleDeleteAll() {
      showConfirm(t("confirmDeleteAll"), () => {
        EventsModule.events = [];
        PaletteModule.savedPalettes = [];
        BooksModule.books = [];

        Storage.clearAll();

        EventsModule.render();
        PaletteModule.render();
        BooksModule.render();
        Dashboard.render();

        Toasts.show(t("toastDataCleared"), "info");
      });
    }
  };

  // =========================================================================
  // 14. APPLICATION INITIALIZATION
  // =========================================================================
  function initApp() {
    ThemeAndLang.init();
    Modals.init();
    Navigation.init();
    EventsModule.init();
    PaletteModule.init();
    BooksModule.init();
    SettingsModule.init();
    Dashboard.render();
  }

  // Launch when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
