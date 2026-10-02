export const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    tagline: "Headphones, smart gadgets, and computer accessories.",
    itemCount: "140+ Items",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
  },
  {
    id: "fashion",
    name: "Clothing & Shoes",
    tagline: "Comfortable clothes, shoes, and warm jackets.",
    itemCount: "210+ Items",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    tagline: "Lamps, coffee makers, and simple home decor.",
    itemCount: "95+ Items",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80"
  },
  {
    id: "beauty",
    name: "Beauty & Skincare",
    tagline: "Gentle daily creams, face oils, and care essentials.",
    itemCount: "65+ Items",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    tagline: "Running shoes, gym gear, and workout equipment.",
    itemCount: "80+ Items",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
  },
  {
    id: "accessories",
    name: "Bags & Watches",
    tagline: "Leather bags, daily wallets, and classic watches.",
    itemCount: "120+ Items",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
  }
];

export const PRODUCTS = [
  // ==========================================
  // ELECTRONICS
  // ==========================================
  {
    id: "aura-sound-pro",
    name: "Aura Pro Wireless Noise-Cancelling Headphones",
    category: "electronics",
    price: 299.00,
    originalPrice: 349.00,
    discountBadge: "15% OFF",
    rating: 4.9,
    reviewsCount: 1280,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock (Fast Shipping)",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "High quality wireless headphones with active noise cancellation. Blocks outside noise, gives clear audio, and has soft ear cushions for all-day comfort.",
    features: [
      "Active Noise Cancellation blocks background noise",
      "Up to 40 hours of battery on one charge",
      "Quick charging: 5 minutes charge gives 4 hours play time",
      "Soft and comfortable ear cushions"
    ],
    colors: ["Matte Black", "Silver Gray", "Titanium"]
  },
  {
    id: "tactile-keyboard",
    name: "Wireless Mechanical Keyboard",
    category: "electronics",
    price: 145.00,
    originalPrice: 175.00,
    discountBadge: "BESTSELLER",
    rating: 5.0,
    reviewsCount: 950,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    description: "Solid metal wireless keyboard with quiet, smooth keys and warm backlighting. Connects easily with Bluetooth, USB, or wireless dongle.",
    features: [
      "Smooth and quiet typing feel",
      "Soft warm LED backlight for night typing",
      "Long battery life: Up to 200 hours per charge",
      "Works with Windows, Mac, and phones"
    ],
    colors: ["Space Gray", "Pure White", "Midnight Black"]
  },
  {
    id: "flux-anc-earbuds",
    name: "Flux Pro True Wireless ANC Earbuds",
    category: "electronics",
    price: 139.00,
    originalPrice: 169.00,
    discountBadge: "18% OFF",
    rating: 4.8,
    reviewsCount: 720,
    isFeatured: true,
    isNew: true,
    isTrending: true,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    description: "Compact wireless earbuds with deep bass, crystal clear mics, and seamless wireless fast charging case.",
    features: [
      "Adaptive Active Noise Cancellation & Transparency Mode",
      "32 Hours Total Playtime with Qi Wireless Case",
      "IPX5 Sweat and Water Resistance",
      "Dual Mic Array with AI Voice Isolation"
    ],
    colors: ["Onyx Black", "Chalk White", "Slate Blue"]
  },
  {
    id: "lumina-smart-speaker",
    name: "Lumina 360° Hi-Fi Studio Smart Speaker",
    category: "electronics",
    price: 189.00,
    originalPrice: 220.00,
    discountBadge: "TOP RATED",
    rating: 4.9,
    reviewsCount: 480,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    description: "Room-filling 360-degree acoustic clarity wrapped in premium acoustic fabric with touch volume wheel.",
    features: [
      "360-degree Spatial Room Audio tuning",
      "Lossless Wi-Fi, AirPlay 2 & Bluetooth 5.3 streaming",
      "Ambient warm glow LED base illumination",
      "Multi-room sync capability"
    ],
    colors: ["Charcoal", "Warm Beige", "Silver Frost"]
  },

  // ==========================================
  // CLOTHING & SHOES (FASHION)
  // ==========================================
  {
    id: "merino-wool-hoodie",
    name: "Merino Wool Warm Everyday Hoodie",
    category: "fashion",
    price: 115.00,
    originalPrice: 140.00,
    discountBadge: "NEW ARRIVAL",
    rating: 4.9,
    reviewsCount: 420,
    isFeatured: true,
    isNew: true,
    isTrending: true,
    isSale: false,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
    description: "Soft, warm hoodie made from 100% natural merino wool. Fits well, feels great, and keeps you warm in cold weather without feeling heavy.",
    features: [
      "100% natural merino wool fabric",
      "Soft double-layer warm hood",
      "Naturally prevents bad odors and sweats",
      "Holds its shape and color after washing"
    ],
    colors: ["Dark Gray", "Warm Beige", "Deep Black"]
  },
  {
    id: "structured-wool-coat",
    name: "Warm Winter Wool Trench Coat",
    category: "fashion",
    price: 320.00,
    originalPrice: 380.00,
    discountBadge: "POPULAR",
    rating: 5.0,
    reviewsCount: 230,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
    description: "A clean, warm winter coat made from heavy wool blend. Keeps you warm, fits comfortably, and features deep side pockets.",
    features: [
      "Thick, warm wool blend fabric",
      "Classic button front with waist belt",
      "Deep inside pockets for phone and wallet",
      "Water-resistant surface treatment"
    ],
    colors: ["Warm Beige", "Camel Tan", "Black"]
  },
  {
    id: "urban-waterproof-jacket",
    name: "All-Weather Technical Urban Windbreaker",
    category: "fashion",
    price: 175.00,
    originalPrice: 210.00,
    discountBadge: "20% OFF",
    rating: 4.7,
    reviewsCount: 390,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    description: "High-performance waterproof and windproof jacket with sealed zippers and breathable mesh lining.",
    features: [
      "20,000mm Waterproof Gore-Tech membrane",
      "Fleece-lined storm collar with packable hood",
      "Magnetic quick-snap front closures",
      "Reflective subtle accents for night safety"
    ],
    colors: ["Stealth Black", "Olive Drab", "Storm Gray"]
  },
  {
    id: "classic-chelsea-boots",
    name: "Handcrafted Suede Chelsea Boots",
    category: "fashion",
    price: 195.00,
    originalPrice: 240.00,
    discountBadge: "PREMIUM",
    rating: 4.8,
    reviewsCount: 510,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
    description: "Italian calf suede boots with flexible crepe rubber soles and pull tabs for effortless daily sophistication.",
    features: [
      "Water-repellent treated Italian suede",
      "Cushioned memory foam insole",
      "Elastic side panels for easy on/off",
      "Durable Goodyear welted sole"
    ],
    colors: ["Sand Taupe", "Espresso Brown", "Midnight Black"]
  },

  // ==========================================
  // HOME & KITCHEN
  // ==========================================
  {
    id: "nordic-ceramic-brew",
    name: "Ceramic Coffee Dripper & Kettle Set",
    category: "home",
    price: 88.00,
    originalPrice: 110.00,
    discountBadge: "20% OFF",
    rating: 4.7,
    reviewsCount: 310,
    isFeatured: true,
    isNew: false,
    isTrending: false,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    description: "A complete set to brew fresh pour-over coffee at home. Comes with a ceramic filter cup, glass pot, and a smooth pour kettle.",
    features: [
      "Durable ceramic dripper gives smooth coffee taste",
      "600ml strong heat-proof glass pot with cup markings",
      "Wooden handle for a safe, comfortable grip",
      "Easy to wash and dishwasher safe"
    ],
    colors: ["Warm Gray", "Pure White", "Basalt Black"]
  },
  {
    id: "brass-desk-lamp",
    name: "Modern Adjustable Brass Desk Lamp",
    category: "home",
    price: 128.00,
    originalPrice: 155.00,
    discountBadge: "17% OFF",
    rating: 4.8,
    reviewsCount: 390,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    description: "Stylish brass desk lamp with an adjustable arm and touch brightness buttons. Gives soft warm light that is easy on the eyes.",
    features: [
      "Solid metal body with brushed brass finish",
      "Warm eye-friendly LED light",
      "Touch sensor to easily adjust brightness",
      "Heavy stable base will not tip over"
    ],
    colors: ["Brushed Brass", "Dark Gunmetal", "Matte Black"]
  },
  {
    id: "aurora-aroma-diffuser",
    name: "Ultrasonic Ceramic Essential Oil Diffuser",
    category: "home",
    price: 54.00,
    originalPrice: 68.00,
    discountBadge: "20% OFF",
    rating: 4.9,
    reviewsCount: 680,
    isFeatured: true,
    isNew: true,
    isTrending: true,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    description: "Handcrafted matte ceramic aroma diffuser with silent ultrasonic misting and soothing ambient light.",
    features: [
      "Quiet ultrasonic whisper technology (<20dB)",
      "Continuous and intermittent mist modes (up to 8h)",
      "Auto shut-off when water level is low",
      "Warm candlelight illumination ring"
    ],
    colors: ["Terracotta", "Bone White", "Slate Gray"]
  },
  {
    id: "artisan-chef-knife",
    name: "Damascus Steel 8-Inch Chef Knife",
    category: "home",
    price: 110.00,
    originalPrice: 145.00,
    discountBadge: "PRO CHEF",
    rating: 5.0,
    reviewsCount: 440,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80",
    description: "67-layer Japanese VG-10 Damascus steel blade with pakkawood ergonomic grip for effortless culinary precision.",
    features: [
      "Razor-sharp 15-degree edge on both sides",
      "67-layer hammered Damascus steel pattern",
      "Ergonomic waterproof Pakkawood handle",
      "Includes protective wooden saya sheath"
    ],
    colors: ["Walnut Finish", "Ebony Black"]
  },

  // ==========================================
  // BEAUTY & SKINCARE
  // ==========================================
  {
    id: "botanical-face-cream",
    name: "Hydrating Daily Botanical Face Cream",
    category: "beauty",
    price: 46.00,
    originalPrice: 58.00,
    discountBadge: "CLEAN CARE",
    rating: 4.9,
    reviewsCount: 1150,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    description: "Gentle daily face moisturizer made with hyaluronic acid and natural plant extracts. Keeps skin soft and hydrated without feeling oily.",
    features: [
      "Deeply hydrates and locks in moisture all day",
      "Lightweight and non-greasy formula",
      "Dermatologist tested and safe for sensitive skin",
      "100% free of artificial perfumes"
    ],
    colors: ["50ml Glass Jar", "100ml Value Size"]
  },
  {
    id: "radiance-glow-serum",
    name: "Triple Vitamin C & Peptides Glow Serum",
    category: "beauty",
    price: 38.00,
    originalPrice: 48.00,
    discountBadge: "BEST VALUE",
    rating: 4.8,
    reviewsCount: 890,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    description: "Potent 15% Vitamin C serum with niacinamide and ferulic acid that evens skin tone and boosts collagen.",
    features: [
      "15% stabilized Vitamin C complex for brighter skin",
      "Hyaluronic acid for plumping hydration",
      "Antioxidant shield against urban pollution",
      "Non-comedogenic & vegan certified"
    ],
    colors: ["30ml Dropper Bottle", "60ml Refill"]
  },
  {
    id: "midnight-recovery-oil",
    name: "Overnight Restorative Squalane Face Oil",
    category: "beauty",
    price: 52.00,
    originalPrice: 65.00,
    discountBadge: "ORGANIC",
    rating: 4.9,
    reviewsCount: 530,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1608248597359-2c6c109720ce?w=800&q=80",
    description: "Deeply nourishing botanical facial oil infused with rosehip, cold-pressed jojoba, and sugarcane squalane.",
    features: [
      "Repairs skin moisture barrier overnight",
      "Cold-pressed organic rosehip & marula oils",
      "Absorbs rapidly without pore clogging",
      "Subtle soothing natural lavender aroma"
    ],
    colors: ["30ml Dropper Bottle"]
  },
  {
    id: "mineral-sunscreen-spf50",
    name: "Invisible Daily Mineral Sunscreen SPF 50",
    category: "beauty",
    price: 34.00,
    originalPrice: 42.00,
    discountBadge: "SUMMER ESSENTIAL",
    rating: 4.7,
    reviewsCount: 710,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
    description: "Non-nano zinc oxide sunscreen that leaves zero white cast while hydrating skin with green tea extracts.",
    features: [
      "Broad Spectrum UVA/UVB SPF 50+ protection",
      "Zero white cast formula on all skin tones",
      "Reef-safe and water-resistant for 80 minutes",
      "Matte velvety finish under makeup"
    ],
    colors: ["50ml Tube", "100ml Value Size"]
  },

  // ==========================================
  // SPORTS & FITNESS
  // ==========================================
  {
    id: "aerogrip-running-shoes",
    name: "AeroGrip Cushion Running Shoes",
    category: "sports",
    price: 160.00,
    originalPrice: 195.00,
    discountBadge: "TOP RATED",
    rating: 4.8,
    reviewsCount: 620,
    isFeatured: true,
    isNew: true,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Super light running shoes with soft cushion soles. Keeps your feet comfortable and cool whether you are running or walking all day.",
    features: [
      "Extra soft cushion sole reduces foot tiredness",
      "Breathable mesh keeps your feet fresh",
      "Strong rubber grip prevents slipping",
      "Lightweight build for daily runs and gym"
    ],
    colors: ["Crimson Red / Black", "All Black", "Pure White"]
  },
  {
    id: "pro-grip-yoga-mat",
    name: "Eco-Natural Rubber Non-Slip Yoga Mat",
    category: "sports",
    price: 58.00,
    originalPrice: 72.00,
    discountBadge: "20% OFF",
    rating: 4.9,
    reviewsCount: 460,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
    description: "5mm dense natural tree rubber mat with laser-engraved alignment lines and moisture-activated grip.",
    features: [
      "100% biodegradable natural tree rubber",
      "Ultra-grip surface prevents sweaty slipping",
      "Laser-etched body alignment lines",
      "Includes complimentary carrying strap"
    ],
    colors: ["Forest Green", "Midnight Blue", "Earth Clay"]
  },
  {
    id: "titan-adjustable-dumbbells",
    name: "Quick-Lock Adjustable Dumbbell Pair (5-52 lbs)",
    category: "sports",
    price: 240.00,
    originalPrice: 299.00,
    discountBadge: "HEAVY DUTY",
    rating: 4.9,
    reviewsCount: 380,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock (Free Freight)",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    description: "Replace 15 pairs of weights with one compact dial-turn adjustable dumbbell set for home workouts.",
    features: [
      "Adjusts in 2.5 lb increments with simple dial turn",
      "Laser-welded steel plates with silent polymer coating",
      "Knurled anti-slip ergonomic steel handles",
      "Includes heavy duty storage trays"
    ],
    colors: ["Matte Black with Red Trim"]
  },
  {
    id: "hydro-smart-flask",
    name: "Insulated Smart Temperature Water Bottle (750ml)",
    category: "sports",
    price: 42.00,
    originalPrice: 50.00,
    discountBadge: "NEW",
    rating: 4.7,
    reviewsCount: 290,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isSale: false,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    description: "Triple-vacuum insulated stainless steel bottle with LED cap that shows live liquid temperature.",
    features: [
      "Keeps cold for 24h and hot for 12h",
      "OLED touch display cap with hydration reminder",
      "BPA-free 18/8 food-grade stainless steel",
      "Leak-proof magnetic cap lock"
    ],
    colors: ["Matte Black", "Arctic White", "Sage Green"]
  },

  // ==========================================
  // BAGS & WATCHES (ACCESSORIES)
  // ==========================================
  {
    id: "obsidian-chrono",
    name: "Classic Minimalist Black Wrist Watch",
    category: "accessories",
    price: 185.00,
    originalPrice: 220.00,
    discountBadge: "16% OFF",
    rating: 4.8,
    reviewsCount: 840,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "A clean and modern wrist watch for everyday wear. Made with scratch-proof glass and a durable stainless steel strap.",
    features: [
      "Accurate quartz movement keeps exact time",
      "Scratch-resistant glass face",
      "Water resistant for rain and hand washing",
      "Comfortable stainless steel mesh band"
    ],
    colors: ["Black", "Silver", "Gold"]
  },
  {
    id: "leather-weekender-bag",
    name: "Classic Leather Weekend Travel Bag",
    category: "accessories",
    price: 245.00,
    originalPrice: 295.00,
    discountBadge: "LIMITED STOCK",
    rating: 4.9,
    reviewsCount: 512,
    isFeatured: true,
    isNew: true,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "Only 4 Left",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Strong genuine leather bag for short trips and weekend getaways. Has a separate pocket for shoes and a padded sleeve for your laptop.",
    features: [
      "100% genuine durable leather",
      "Strong metal zippers and shoulder strap",
      "Separate bottom pocket for shoes",
      "Fits easily into airline carry-on bins"
    ],
    colors: ["Dark Brown", "Black", "Tan Brown"]
  },
  {
    id: "carbon-slim-wallet",
    name: "RFID-Blocking Carbon Fiber Slim Wallet",
    category: "accessories",
    price: 48.00,
    originalPrice: 60.00,
    discountBadge: "20% OFF",
    rating: 4.9,
    reviewsCount: 1420,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isSale: true,
    isBestSeller: true,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    description: "Ultra-slim carbon fiber wallet with quick card pop-up trigger and integrated cash clip.",
    features: [
      "Blocks RFID scanners to protect against theft",
      "Holds up to 12 cards with instant pop-up switch",
      "Aerospace-grade 3K carbon fiber build",
      "Ultra light at only 45 grams"
    ],
    colors: ["Matte Carbon", "Gunmetal Gray", "Forged Carbon"]
  },
  {
    id: "vintage-canvas-backpack",
    name: "Heritage Waxed Canvas & Leather Laptop Backpack",
    category: "accessories",
    price: 145.00,
    originalPrice: 175.00,
    discountBadge: "POPULAR",
    rating: 4.8,
    reviewsCount: 610,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isSale: true,
    isBestSeller: false,
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    description: "Water-resistant 16oz waxed canvas pack with full-grain leather straps and dedicated 16-inch laptop compartment.",
    features: [
      "Water-repellent 16oz heavy waxed canvas",
      "Padded 16-inch fleece laptop sleeve",
      "Solid brass buckles with magnetic quick-snaps",
      "Breathable cushioned mesh back panel"
    ],
    colors: ["Khaki Olive", "Charcoal Gray", "Deep Navy"]
  }
];

export const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($) | US Dollar" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€) | Euro" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£) | British Pound" },
  CAD: { symbol: "CA$", rate: 1.36, label: "CAD (CA$) | Canadian Dollar" },
  JPY: { symbol: "¥", rate: 154.5, label: "JPY (¥) | Japanese Yen" }
};
