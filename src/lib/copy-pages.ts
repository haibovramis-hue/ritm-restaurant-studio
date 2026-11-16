import { tr } from "./i18n";
import { CAPACITY } from "./copy";

export const B = {
  title: tr("Svinības pie liela galda", "Праздник за большим столом", "Celebrations around one big table"),
  sub: tr(CAPACITY.lv, CAPACITY.ru, CAPACITY.en),
  cta: tr("Pieteikt banketu", "Заказать банкет", "Request a banquet"),
  promise: tr("Sazināsimies ar jums, lai precizētu detaļas.", "Свяжемся с вами, чтобы уточнить детали.", "We’ll get back to you to confirm the details."),
  facts: [
    tr("Zāles līdz 100 viesiem", "Залы до 100 гостей", "Halls for up to 100 guests"),
    tr("Vasarā ar terasi līdz 300", "Летом с террасой до 300", "Up to 300 with the summer terrace"),
    tr("Bezmaksas stāvvieta", "Бесплатная парковка", "Free parking"),
  ],
  occasions: [
    tr("Kāzas", "Свадьба", "Wedding"), tr("Jubileja", "Юбилей", "Anniversary / birthday"), tr("Kristības", "Крестины", "Christening"),
    tr("Korporatīvais pasākums", "Корпоратив", "Corporate event"), tr("Bērnu svētki", "Детский праздник", "Kids’ party"),
    tr("Ziemassvētki / Jaungads", "Рождество / Новый год", "Christmas / New Year"), tr("Bēru mielasts", "Поминальный обед", "Memorial meal"),
  ],
  xmasIndex: 5,
  form: {
    title: tr("Banketa pieteikums", "Заявка на банкет", "Banquet request"),
    date: tr("Datums", "Дата", "Date"), guests: tr("Viesu skaits", "Количество гостей", "Number of guests"), occasion: tr("Notikums", "Повод", "Occasion"),
    name: tr("Vārds", "Имя", "Name"), phone: tr("Tālrunis", "Телефон", "Phone"),
    comment: tr("Komentārs (nav obligāts)", "Комментарий (необязательно)", "Comment (optional)"),
    submit: tr("WhatsApp", "WhatsApp", "WhatsApp"),
    msg: tr("Banketa pieteikums — Zelta Pakavs", "Заявка на банкет — Zelta Pakavs", "Banquet request — Zelta Pakavs"),
  },
  memorial: {
    eyebrow: tr("Bēru mielasts", "Поминальный обед", "Memorial meal"),
    title: tr("Kluss galds piemiņai", "Тихий стол в память", "A quiet table in remembrance"),
    text: tr("Mēs parūpēsimies par visu, lai jūs varētu būt kopā ar tuviniekiem. Atsevišķa, mierīga zāle, balti galdauti, vienkārša un sirsnīga ēdienkarte.", "Мы позаботимся обо всём, чтобы вы могли быть рядом с близкими. Отдельный спокойный зал, белые скатерти, простое и душевное меню.", "We take care of everything so you can be with your family. A separate, quiet hall, white linen, a simple and heartfelt menu."),
    price: tr("no €15 personai", "от €15 с человека", "from €15 per person"),
    call: tr("Piezvanīt", "Позвонить", "Call us"), write: tr("Nosūtīt e-pastā", "Отправить на e-mail", "Send by e-mail"),
    msg: tr("Bēru mielasts — Zelta Pakavs", "Поминальный обед — Zelta Pakavs", "Memorial meal — Zelta Pakavs"),
  },
};

export const S = {
  title: tr("Krievu pirts ar baseinu", "Русская баня с бассейном", "Russian banya with a pool"),
  features: [
    tr("Malkas krievu pirts", "Русская баня на дровах", "Wood-fired Russian banya"),
    tr("Liels apsildāms baseins", "Большой подогреваемый бассейн", "Big heated pool"),
    tr("Banketa zāle 20 personām: kamīns, TV, karaoke", "Банкетный зал на 20: камин, ТВ, караоке", "Banquet hall for 20: fireplace, TV, karaoke"),
    tr("Guļamistabas", "Спальни", "Bedrooms"),
    tr("Āra grila zona un terase", "Уличная гриль-зона и терраса", "Outdoor grill zone & terrace"),
    tr("Bezmaksas stāvvieta", "Бесплатная парковка", "Free parking"),
    tr("Bērza un ozola slotas", "Берёзовые и дубовые веники", "Birch & oak brooms"),
    tr("Ēdiens no restorāna", "Еда из ресторана", "Food from the restaurant"),
  ],
  price: tr("Cena — pēc pieprasījuma", "Цена — по запросу", "Price on request"),
  book: tr("Rezervācija", "Бронирование", "Booking"), call: tr("Zvanīt", "Позвонить", "Call"), wa: tr("WhatsApp", "WhatsApp", "WhatsApp"),
  waMsg: tr("ZP Pirts rezervācija", "Бронирование ZP Pirts", "ZP Pirts booking"),
  contact: tr("Kontaktpersona", "Контактное лицо", "Contact person"),
  food: tr("Ēdienu pasūtiet tieši no restorāna — atnesīsim uz pirti.", "Еду заказывайте прямо из ресторана — принесём в баню.", "Order food straight from the restaurant — we bring it to the banya."),
};

export const XMAS = {
  eyebrow: tr("Svētku sezona 2026/27", "Праздничный сезон 2026/27", "Festive season 2026/27"),
  title: tr("Ziemassvētku un Jaungada svinības 2026/27", "Рождество и Новый год 2026/27", "Christmas & New Year celebrations 2026/27"),
  sub: tr("Korporatīvie vakari un ģimenes svētki. Rezervējiet datumu jau tagad.", "Корпоративные вечера и семейные праздники. Бронируйте дату уже сейчас.", "Corporate evenings and family celebrations. Reserve your date now."),
  cta: tr("Rezervēt datumu", "Забронировать дату", "Reserve a date"),
};
