import { tr, type L } from "./i18n";
export type Badge = "sig" | "fav" | "veg" | "togo";
export type MenuItem = { id: string; name: L; desc: L; price: string; badges: Badge[] };
export type MenuCat = { id: string; name: L; items: MenuItem[]; compact?: boolean };

export const BADGES: Record<Badge, L> = {
  sig: tr("Firmas", "Фирменное", "Signature"),
  fav: tr("Viesu favorīts", "Любимое гостей", "Guests' favourite"),
  veg: tr("Veģetārs", "Вегетарианское", "Vegetarian"),
  togo: tr("Arī līdzi", "Также навынос", "Also to go"),
};

type T = [string, string, string];
const E: T = ["", "", ""];
const i = (id: string, n: T, price: string, d: T = E, badges: Badge[] = []): MenuItem => ({ id, name: tr(...n), desc: tr(...d), price: `${price} €`, badges });

/** 1:1 with the official menu (Instagram menu post, Nov 2026). LV names verbatim. */
export const MENU: MenuCat[] = [
  { id: "cold", name: tr("Aukstās uzkodas", "Холодные закуски", "Cold starters"), items: [
    i("herring", ["Siļķe ar kartupeļiem", "Сельдь с картофелем", "Herring with potatoes"], "7,00", ["Klasiska uzkoda ar vārītiem kartupeļiem", "Классическая закуска с отварным картофелем", "A classic with boiled potatoes"]),
    i("cucumbers", ["Gurķi ar zaļumiem un ķiplokiem", "Огурцы с зеленью и чесноком", "Cucumbers with herbs and garlic"], "5,00", E, ["veg"]),
    i("salo", ["Speķis ar sīpoliem", "Сало с луком", "Salo with onions"], "6,50"),
    i("basturma", ["Basturma", "Бастурма", "Basturma"], "10,50", ["Kaltēta liellopa gaļa", "Вяленая говядина", "Air-dried beef"]),
    i("tongue", ["Vārīta mēle", "Отварной язык", "Boiled tongue"], "9,00"),
    i("aubergine-nuts", ["Baklažāni ar sieru un riekstiem", "Баклажаны с сыром и орехами", "Aubergine with cheese and walnuts"], "7,50", E, ["veg"]),
    i("aubergine-tom", ["Baklažāns ar tomātiem", "Баклажан с помидорами", "Aubergine with tomatoes"], "7,00", E, ["veg"]),
    i("salmon-tartare", ["Laša tartars ar avokado", "Тартар из лосося с авокадо", "Salmon tartare with avocado"], "11,80"),
    i("pickles", ["Gurķi no mucas", "Бочковые огурцы", "Barrel pickles"], "5,00", E, ["veg"]),
    i("south-pickles", ["Dienvidu sālījumi", "Южные соленья", "Southern pickles"], "13,50", E, ["veg"]),
    i("veg-platter", ["Svaigu dārzeņu asorti", "Ассорти из свежих овощей", "Fresh vegetable platter"], "9,00", E, ["veg"]),
    i("beef-tartare", ["Liellopu gaļas tartars", "Тартар из говядины", "Beef tartare"], "11,80"),
    i("cabbage-pie", ["Kāpostu pīrāgs", "Пирог с капустой", "Cabbage pie"], "6,00", ["Mājas pīrāgs ar kāpostiem", "Домашний пирог с капустой", "Homemade pie with cabbage"], ["veg"]),
  ] },
  { id: "hotst", name: tr("Karstās uzkodas", "Горячие закуски", "Hot starters"), items: [
    i("royal-croutons", ["Karaliskie grauzdiņi", "Королевские гренки", "Royal croutons"], "5,50"),
    i("garlic-croutons", ["Grauzdiņi ar ķiplokiem", "Гренки с чесноком", "Garlic croutons"], "5,50", E, ["veg"]),
    i("julienne-ch", ["Vistas gaļas žuljēns", "Жюльен из курицы", "Chicken julienne"], "8,00"),
    i("julienne-porcini", ["Baraviku žuljēns", "Жюльен из белых грибов", "Porcini julienne"], "10,00", E, ["veg"]),
    i("adjarian", ["Hačapuri Adžāru gaumē", "Хачапури по-аджарски", "Adjarian khachapuri"], "10,50", ["Laiviņa ar sieru, olu un sviestu", "Лодочка с сыром, яйцом и маслом", "Cheese boat with egg and butter"], ["sig", "veg"]),
    i("mussels-p", ["Mīdijas ar Parmezānu", "Мидии с пармезаном", "Mussels with Parmesan"], "15,00"),
    i("beer-snacks", ["Alus uzkodas", "Закуски к пиву", "Beer snacks"], "15,00"),
    i("penovani", ["Penovani hačapuri", "Пеновани хачапури", "Penovani khachapuri"], "6,00", ["Kārtainā mīklā ar sieru", "Слоёное тесто с сыром", "Flaky pastry with cheese"], ["veg"]),
    i("tempura", ["Garneles tempurā", "Креветки в темпуре", "Shrimp tempura"], "14,00"),
  ] },
  { id: "salads", name: tr("Salāti", "Салаты", "Salads"), items: [
    i("greek", ["Grieķu salāti", "Греческий салат", "Greek salad"], "8,00", E, ["veg"]),
    i("meatsalad", ["Gaļas salāti ar liellopu gaļu", "Мясной салат с говядиной", "Meat salad with beef"], "8,50"),
    i("mango", ["Garneļu un mango salāti", "Салат с креветками и манго", "Shrimp & mango salad"], "12,00"),
    i("caesar-ch", ["Cēzara salāti ar vistas fileju", "Цезарь с куриным филе", "Caesar with chicken fillet"], "9,00"),
    i("caesar-sh", ["Cēzara salāti ar garnelēm", "Цезарь с креветками", "Caesar with shrimps"], "12,00"),
    i("tonguesalad", ["Mēles salāti", "Салат с языком", "Tongue salad"], "8,50"),
    i("teriyaki", ["Bowl ar teriyaki vistu", "Боул с курицей терияки", "Teriyaki chicken bowl"], "11,00"),
    i("poke", ["Bowl ar lasi", "Боул с лососем", "Salmon bowl"], "15,00"),
    i("octosalad", ["Siltie astoņkāju salāti", "Тёплый салат с осьминогом", "Warm octopus salad"], "14,00"),
  ] },
  { id: "soups", name: tr("Zupas", "Супы", "Soups"), items: [
    i("chsoup", ["Vistas zupa", "Куриный суп", "Chicken soup"], "6,00"),
    i("porcini", ["Baraviku zupa", "Суп из белых грибов", "Porcini soup"], "7,00"),
    i("kharcho", ["Jēra gaļas harčo", "Харчо из баранины", "Lamb kharcho"], "8,00", ["Bieza jēra zupa ar rīsiem", "Густой суп с бараниной и рисом", "Thick lamb and rice soup"]),
    i("solyanka", ["Klasiskā soļanka", "Классическая солянка", "Classic solyanka"], "7,00", ["Bagātīga gaļas zupa ar citronu", "Сборная мясная с лимоном", "Rich mixed-meat soup with lemon"], ["fav"]),
    i("coldsoup", ["Sezonas aukstā zupa", "Сезонный холодный суп", "Seasonal cold soup"], "7,00"),
  ] },
  { id: "meat", name: tr("Karstie gaļas ēdieni", "Горячие мясные блюда", "Hot meat dishes"), items: [
    i("steak", ["Steiks \"Zelta Pakavs\"", "Стейк «Zelta Pakavs»", "Steak “Zelta Pakavs”"], "24,00", ["Mūsu nama steiks", "Фирменный стейк дома", "Our house steak"], ["sig"]),
    i("merchant", ["Tirgoņu gaļa", "Мясо по-купечески", "Merchant-style meat"], "17,00", ["Cepta gaļa zem siera kārtiņas", "Запечённое мясо под сырной корочкой", "Baked meat under a cheese crust"], ["fav"]),
    i("stroganoff", ["Teļa gaļas stroganovs", "Бефстроганов из телятины", "Veal stroganoff"], "17,00"),
    i("manti", ["Jēra gaļas Uzbeku manti", "Узбекские манты с бараниной", "Uzbek lamb manti"], "18,00"),
    i("khinkali", ["Hinkali", "Хинкали", "Khinkali"], "11,00", ["Ar gaļu un buljonu", "С мясом и бульоном внутри", "With meat and broth inside"]),
    i("dolma", ["Dolma", "Долма", "Dolma"], "13,00", ["Gaļa vīnogu lapās", "Мясо в виноградных листьях", "Meat in vine leaves"]),
    i("pelmeni", ["Mājas pelmeņi", "Домашние пельмени", "Homemade pelmeni"], "8,50"),
    i("cutlets", ["Vistas kotletes ar biezeni", "Куриные котлеты с пюре", "Chicken cutlets with mash"], "11,50"),
    i("nuggets", ["Nageti ar frī kartupeļiem", "Наггетсы с картофелем фри", "Nuggets with fries"], "10,80"),
    i("burger", ["Liellopa burgers ar kartupeļiem", "Бургер из говядины с картофелем", "Beef burger with potatoes"], "14,00"),
    i("shrimp-burger", ["Tīģergarneļu burgers", "Бургер с тигровыми креветками", "Tiger prawn burger"], "16,00"),
    i("knuckle", ["Cūkgaļas stilbs ar sautētiem kāpostiem", "Свиная рулька с тушёной капустой", "Pork knuckle with stewed cabbage"], "15,00", ["Liela porcija ar kraukšķīgu ādiņu", "Большая порция с хрустящей шкуркой", "A generous portion with crackling"], ["fav"]),
  ] },
  { id: "fish", name: tr("Karstie zivju ēdieni", "Горячие рыбные блюда", "Hot fish dishes"), items: [
    i("octopus", ["Astoņkāji ar biezeni", "Осьминог с пюре", "Octopus with mash"], "21,00"),
    i("mussels", ["Mīdijas mērcē 1 kg", "Мидии в соусе, 1 кг", "Mussels in sauce, 1 kg"], "17,00"),
    i("catfish", ["Sams ar sparģeļiem", "Сом со спаржей", "Catfish with asparagus"], "16,00"),
    i("whitefish", ["Balta zivs", "Белая рыба", "White fish"], "19,00"),
  ] },
  { id: "grill", name: tr("Grilētie ēdieni", "Блюда на гриле", "Grill"), items: [
    i("lamb", ["Kaukāza jēra gaļas šašliks", "Кавказский шашлык из баранины", "Caucasian lamb shashlik"], "18,00", ["Marinēts jērs no ogļu grila", "Маринованная баранина с мангала", "Marinated lamb from the coals"], ["sig"]),
    i("chicken", ["Vistas šašliks", "Шашлык из курицы", "Chicken shashlik"], "9,50"),
    i("chfillet", ["Vistas filejas šašliks", "Шашлык из куриного филе", "Chicken fillet shashlik"], "11,50"),
    i("lula-ch", ["Vistas ļuļa-kebabs", "Люля-кебаб из курицы", "Chicken lula kebab"], "11,00"),
    i("lula-lamb", ["Jēra ļuļa-kebabs", "Люля-кебаб из баранины", "Lamb lula kebab"], "16,00"),
    i("salmon", ["Laša steiks vai šašliks", "Стейк или шашлык из лосося", "Salmon steak or shashlik"], "19,00"),
    i("ribs", ["Cūkgaļas ribiņas", "Свиные рёбрышки", "Pork ribs"], "11,50"),
    i("pork", ["Cūkgaļas kakla karbonādes šašliks (standarts vai nostalģija)", "Шашлык из свиной шеи (стандарт или ностальгия)", "Pork neck shashlik (standard or nostalgic)"], "10,50", E, ["fav"]),
    i("chalahaj", ["Čalahadž", "Чалахач", "Chalahaj"], "16,00", ["Jēra ribiņas kaukāziešu gaumē", "Бараньи рёбрышки по-кавказски", "Lamb ribs, Caucasian style"], ["sig"]),
    i("plate4", ["Grilēta gaļas plate ar kartupeļiem (4 pers.)", "Мясное ассорти на гриле с картофелем (4 перс.)", "Grilled meat plate with potatoes (4 pers.)"], "49,00", ["Liela plate visai kompānijai", "Большое ассорти на всю компанию", "A big platter for the whole table"], ["sig", "togo"]),
  ] },
  { id: "pasta", name: tr("Pastas", "Паста", "Pasta"), items: [
    i("pasta-ch", ["Pasta ar vistas gaļu", "Паста с курицей", "Pasta with chicken"], "9,50"),
    i("pasta-mush", ["Pasta ar Latvijas sēnēm", "Паста с латвийскими грибами", "Pasta with Latvian mushrooms"], "12,00", E, ["veg"]),
  ] },
  { id: "pancakes", name: tr("Pankūkas", "Блины и оладьи", "Pancakes"), items: [
    i("blini", ["Plānās pankūkas", "Тонкие блины", "Thin pancakes"], "7,00", E, ["veg"]),
    i("syrniki", ["Biezpiena plācenīši", "Сырники", "Syrniki"], "8,50", ["Ar krējumu", "Со сметаной", "With sour cream"], ["fav", "veg"]),
    i("draniki", ["Kartupeļu pankūkas", "Драники", "Potato pancakes"], "7,50", E, ["veg"]),
    i("draniki-salmon", ["Kartupeļu pankūkas ar lasi", "Драники с лососем", "Potato pancakes with salmon"], "15,00"),
    i("draniki-bacon", ["Kartupeļu pankūkas ar bekonu", "Драники с беконом", "Potato pancakes with bacon"], "11,00"),
  ] },
  { id: "platters", name: tr("Plates", "Ассорти", "Platters"), items: [
    i("cuts", ["Gaļas asorti", "Мясное ассорти", "Meat platter"], "35,00"),
    i("wine", ["Vīna plate", "Винная тарелка", "Wine platter"], "25,00"),
    i("p100", ["Plāte gračiņam", "Тарелка «под рюмочку»", "Platter for a shot"], "9,00", E, ["sig"]),
    i("cheese", ["Siera plate", "Сырное ассорти", "Cheese platter"], "25,00", E, ["veg"]),
    i("fishplatter", ["Zivju plate", "Рыбное ассорти", "Fish platter"], "45,00"),
  ] },
  { id: "sides", compact: true, name: tr("Piedevas", "Гарниры", "Sides"), items: [
    i("fries", ["Kartupeļi frī", "Картофель фри", "French fries"], "4,00"),
    i("wedges", ["Kartupeļu daiviņas", "Картофельные дольки", "Potato wedges"], "4,00"),
    i("boiled", ["Vārīti kartupeļi", "Отварной картофель", "Boiled potatoes"], "4,00"),
    i("rice", ["Rīsi basmati", "Рис басмати", "Basmati rice"], "4,50"),
    i("sourcream-pot", ["Saldā krējumā cepti kartupeļi", "Картофель, запечённый в сливках", "Potatoes baked in cream"], "5,50"),
    i("grilled-veg", ["Grilēti dārzeņi", "Овощи гриль", "Grilled vegetables"], "8,50"),
    i("mash", ["Kartupeļu biezenis", "Картофельное пюре", "Mashed potatoes"], "5,00"),
    i("homepot", ["Kartupeļi mājas gaumē", "Картофель по-домашнему", "Home-style potatoes"], "6,00"),
    i("bread", ["Maize", "Хлеб", "Bread"], "1,50"),
    i("lavash", ["Lavašs", "Лаваш", "Lavash"], "3,00"),
  ] },
  { id: "sauces", compact: true, name: tr("Mērces", "Соусы", "Sauces"), items: [
    i("zp-sauce", ["ZP mērce", "Соус ZP", "ZP sauce"], "2,00"),
    i("ketchup", ["Kečups", "Кетчуп", "Ketchup"], "2,00"),
    i("mayo", ["Majonēze", "Майонез", "Mayonnaise"], "2,00"),
    i("adjika", ["Adžika", "Аджика", "Adjika"], "3,50"),
    i("mush-sauce", ["Meža sēņu mērce", "Соус из лесных грибов", "Wild mushroom sauce"], "4,50"),
    i("cheese-sauce", ["Siera mērce", "Сырный соус", "Cheese sauce"], "3,50"),
    i("garlic-sauce", ["Ķiploku mērce", "Чесночный соус", "Garlic sauce"], "2,50"),
  ] },
  { id: "desserts", name: tr("Deserti", "Десерты", "Desserts"), items: [
    i("strudel", ["Ābolu strūdele", "Яблочный штрудель", "Apple strudel"], "7,50"),
    i("fondant", ["Šokolādes fondants ar saldējumu", "Шоколадный фондан с мороженым", "Chocolate fondant with ice cream"], "8,50", ["Silts, ar plūstošu serdi", "Тёплый, с текучей серединкой", "Warm, with a molten centre"], ["fav"]),
    i("cheesecake", ["Siera kūka", "Чизкейк", "Cheesecake"], "7,50"),
    i("icecream", ["Saldējuma asorti", "Ассорти мороженого", "Ice cream selection"], "7,00"),
    i("dotd", ["Dienas deserts", "Десерт дня", "Dessert of the day"], "7,50", ["Jautājiet viesmīlim", "Спросите официанта", "Ask your waiter"]),
  ] },
];

export const SIGNATURE_IDS = ["lamb", "plate4", "chalahaj", "knuckle", "merchant", "adjarian", "solyanka", "fondant"];
export const GRILL_PREORDER_IDS = ["plate4", "pork", "lamb", "chicken", "chfillet", "lula-lamb", "lula-ch", "salmon", "ribs", "chalahaj"];
export const findItem = (id: string) => MENU.flatMap((c) => c.items).find((x) => x.id === id);
