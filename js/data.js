// AURA LUXE TECH - Product Data Catalog v2.0
// Includes: stock, rating, reviewCount, gallery for enhanced features

window.PRODUCTS = [
  {
    id: 'prod-01',
    name: 'iPhone 16 Pro Max Desert Titanium',
    category: 'smartphone',
    categoryName: 'Điện thoại',
    price: 34990000,
    priceFormatted: '34.990.000₫',
    image: 'images/iphone-16-pro-max.jpg',
    gallery: [
      'images/iphone-16-pro-max.jpg',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Flagship',
    badgeType: 'gold',
    stock: 15,
    rating: 4.9,
    reviewCount: 324,
    shortDesc: 'Khung viền Titanium chuẩn hàng không vũ trụ, chip Apple A18 Pro 3nm vượt trội, nút điều khiển Camera Control đột phá.',
    description: 'iPhone 16 Pro Max sở hữu màn hình Super Retina XDR 6.9 inch với viền mỏng nhất từ trước đến nay. Trang bị chip A18 Pro hỗ trợ Apple Intelligence tiên tiến, hệ thống camera Fusion 48MP với khả năng quay video 4K 120fps Dolby Vision điện ảnh.',
    specs: {
      'Màn hình': '6.9" Super Retina XDR OLED, 120Hz ProMotion',
      'Vi xử lý': 'Apple A18 Pro (3nm thế hệ 2)',
      'Bộ nhớ': '256GB NVMe siêu tốc',
      'Camera': 'Chính 48MP + Tele 5x 12MP + Ultra Wide 48MP',
      'Vật liệu': 'Titanium cấp 5 hoàn thiện hạt bóng mịn',
      'Kháng nước': 'IP68 (sâu 6m trong 30 phút)'
    },
    warranty: 'Bảo hành chính hãng 12 tháng tại Apple Care Việt Nam'
  },
  {
    id: 'prod-02',
    name: 'Samsung Galaxy S25 Ultra Titanium',
    category: 'smartphone',
    categoryName: 'Điện thoại',
    price: 33990000,
    priceFormatted: '33.990.000₫',
    image: 'images/galaxy-s25-ultra.jpg',
    gallery: [
      'images/galaxy-s25-ultra.jpg',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Mới ra mắt',
    badgeType: 'gold',
    stock: 8,
    rating: 4.8,
    reviewCount: 218,
    shortDesc: 'Thiết kế phẳng tinh xảo, sức mạnh Snapdragon 8 Elite for Galaxy và hệ sinh thái Galaxy AI thế hệ mới.',
    description: 'Galaxy S25 Ultra định nghĩa lại chuẩn mực smartphone cao cấp với khung viền Titanium dát vàng sang trọng, bút S-Pen tích hợp độ trễ 2.8ms, màn hình Dynamic AMOLED 2X sáng 2600 nits chống chói độc quyền Gorilla Armor.',
    specs: {
      'Màn hình': '6.8" Dynamic AMOLED 2X, QHD+, 1-120Hz',
      'Vi xử lý': 'Snapdragon 8 Elite for Galaxy 4.47GHz',
      'RAM / ROM': '12GB LPDDR5X / 256GB UFS 4.0',
      'Camera': '200MP OIS + 50MP Periscope 5x + 50MP Ultrawide',
      'Pin & Sạc': '5000 mAh, sạc nhanh 45W siêu tốc',
      'Tiện ích': 'Tích hợp S-Pen thông minh với cử chỉ không chạm'
    },
    warranty: 'Bảo hành 12 tháng chính hãng Samsung & gói Samsung Care+'
  },
  {
    id: 'prod-03',
    name: 'Apple AirPods Pro Gen 3 Active ANC',
    category: 'audio',
    categoryName: 'Âm thanh',
    price: 6990000,
    priceFormatted: '6.990.000₫',
    image: 'images/airpods-pro-3.jpg',
    gallery: [
      'images/airpods-pro-3.jpg',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Best Seller',
    badgeType: 'silver',
    stock: 42,
    rating: 4.7,
    reviewCount: 567,
    shortDesc: 'Chống ồn chủ động thích ứng thế hệ mới, âm thanh không gian Spatial Audio theo dõi đầu người chính xác.',
    description: 'AirPods Pro Gen 3 tái hiện từng nốt nhạc với độ chi tiết tinh tế, chip H2 độc quyền tối ưu hóa âm trầm sâu lắng và khử tiếng ồn môi trường gấp đôi. Hộp sạc tích hợp loa tìm kiếm Find My chính xác.',
    specs: {
      'Chip xử lý': 'Apple H2 Headphone Processor',
      'Công nghệ âm': 'Chống ồn ANC thích ứng, Chế độ Xuyên âm thông minh',
      'Thời lượng pin': '6 giờ liên tục, 30 giờ cùng hộp sạc MagSafe',
      'Cổng sạc': 'USB-C, sạc không dây Qi & MagSafe',
      'Cảm biến': 'Cảm ứng vuốt chỉnh âm lượng, cảm biến quang học'
    },
    warranty: 'Bảo hành 12 tháng đổi mới chính hãng Apple'
  },
  {
    id: 'prod-04',
    name: 'Samsung Galaxy Watch Ultra 47mm',
    category: 'wearable',
    categoryName: 'Đồng hồ thông minh',
    price: 9990000,
    priceFormatted: '9.990.000₫',
    image: 'images/galaxy-watch-ultra.jpg',
    gallery: [
      'images/galaxy-watch-ultra.jpg',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Đẳng cấp thể thao',
    badgeType: 'silver',
    stock: 5,
    rating: 4.5,
    reviewCount: 89,
    shortDesc: 'Khung vỏ Titanium đệm cushion siêu bền, chuẩn kháng nước 10ATM và GPS băng tần kép chuyên nghiệp.',
    description: 'Chiếc đồng hồ thể thao và mạo hiểm đỉnh cao của Samsung. Màn hình Sapphire chống trầy đạt độ sáng 3000 nits ngoài trời nắng gắt. Pin bền bỉ lên đến 100 giờ ở chế độ tiết kiệm năng lượng cùng còi báo động cứu hộ 86dB.',
    specs: {
      'Kích thước': '47.4 x 47.4 x 12.1 mm, 60.5g',
      'Màn hình': '1.5" Super AMOLED, kính Sapphire Crystal 3000 nits',
      'Vật liệu': 'Titanium Grade 4 cao cấp',
      'Độ bền': '10 ATM, IP68, tiêu chuẩn quân đội MIL-STD-810H',
      'Cảm biến': 'BioActive (Điện tâm đồ ECG, Huyết áp, Thành phần cơ thể)'
    },
    warranty: 'Bảo hành 12 tháng chính hãng Samsung'
  },
  {
    id: 'prod-05',
    name: 'iPad Pro M4 13-inch Ultra Retina XDR',
    category: 'tablet',
    categoryName: 'Máy tính bảng',
    price: 37990000,
    priceFormatted: '37.990.000₫',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Mỏng nhất lịch sử',
    badgeType: 'gold',
    stock: 12,
    rating: 4.8,
    reviewCount: 156,
    shortDesc: 'Độ mỏng kinh ngạc 5.1mm, màn hình Tandem OLED hai lớp đột phá và chip Apple M4 với Neural Engine cực mạnh.',
    description: 'Kiệt tác máy tính bảng mỏng nhất từng được Apple chế tác. Sở hữu màn hình OLED 2 lớp sáng tối đa 1600 nits HDR, tương thích Apple Pencil Pro với phản hồi rung haptic xoay góc bút chân thực.',
    specs: {
      'Màn hình': '13" Tandem OLED Ultra Retina XDR 2752 x 2064',
      'Chipset': 'Apple M4 (CPU 9 nhân, GPU 10 nhân Ray Tracing)',
      'Độ mỏng': '5.1 mm — siêu nhẹ chỉ 579g',
      'Camera': '12MP Wide 4K + Máy quét LiDAR đo chiều sâu',
      'Kết nối': 'Thunderbolt 4 / USB 4, Wi-Fi 6E siêu tốc'
    },
    warranty: 'Bảo hành 12 tháng chính hãng Apple Care'
  },
  {
    id: 'prod-06',
    name: 'Tai nghe Sony WH-1000XM5 Midnight Black',
    category: 'audio',
    categoryName: 'Âm thanh',
    price: 8490000,
    priceFormatted: '8.490.000₫',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Âm thanh Hi-Res',
    badgeType: 'silver',
    stock: 20,
    rating: 4.6,
    reviewCount: 412,
    shortDesc: 'Hệ thống 8 microphone khử ồn với 2 bộ xử lý Auto NC Optimizer, màng loa 30mm sợi carbon nhẹ tự nhiên.',
    description: 'Chuẩn mực tai nghe over-ear chống ồn hàng đầu thế giới. Thiết kế không khớp nối không gây tiếng rít gió, đệm da mềm ôm trọn vành tai tạo cảm giác êm ái suốt cả ngày làm việc và bay đường dài.',
    specs: {
      'Bộ xử lý chống ồn': 'Sony V1 + HD QN1 tích hợp 8 micro',
      'Driver': '30mm màng loa sợi carbon tổng hợp',
      'Codec hỗ trợ': 'LDAC, AAC, SBC, DSEE Extreme',
      'Thời lượng pin': '30 giờ (bật ANC), sạc nhanh 3 phút nghe 3 giờ',
      'Tính năng': 'Speak-to-Chat tự động dừng nhạc khi cất tiếng'
    },
    warranty: 'Bảo hành 12 tháng tại Sony Center Việt Nam'
  },
  {
    id: 'prod-07',
    name: 'MacBook Pro 16 M3 Max Space Black',
    category: 'laptop',
    categoryName: 'Máy tính xách tay',
    price: 89990000,
    priceFormatted: '89.990.000₫',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Cỗ máy quái vật',
    badgeType: 'gold',
    stock: 3,
    rating: 4.9,
    reviewCount: 198,
    shortDesc: 'Màu sắc Space Black phủ lớp anodized chống bám vân tay, chip M3 Max 16-Core CPU và 40-Core GPU chuyên nghiệp.',
    description: 'Chiếc laptop chuyên nghiệp mạnh nhất dành cho kỹ sư AI, đạo diễn phim và nhà thiết kế kiến trúc 3D. Màn hình Liquid Retina XDR độ sáng 1000 nits toàn màn hình cùng thời lượng pin lên đến 22 tiếng.',
    specs: {
      'Màn hình': '16.2" Liquid Retina XDR 3456 x 2234, 120Hz ProMotion',
      'Chipset': 'Apple M3 Max (16 CPU, 40 GPU, 16 Neural Engine)',
      'RAM / Ổ cứng': '48GB Unified Memory / 1TB SSD 7400MB/s',
      'Cổng kết nối': '3x Thunderbolt 4, HDMI 8K, SDXC, MagSafe 3',
      'Âm thanh': 'Hệ thống 6 loa stereo với woofer triệt tiêu lực'
    },
    warranty: 'Bảo hành 12 tháng Apple Care Worldwide'
  },
  {
    id: 'prod-08',
    name: 'Loa Bang & Olufsen Beosound A1 2nd Gen',
    category: 'audio',
    categoryName: 'Âm thanh',
    price: 7990000,
    priceFormatted: '7.990.000₫',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Âm thanh Đan Mạch',
    badgeType: 'silver',
    stock: 7,
    rating: 4.4,
    reviewCount: 76,
    shortDesc: 'Nhôm thổi cát anodized, dây đeo da bò thật cao cấp, âm thanh True360 tròn đầy phủ khắp không gian.',
    description: 'Chế tác từ nhôm ngọc trai nguyên khối tại Đan Mạch bởi nhà thiết kế huyền thoại Cecilie Manz. Loa di động cao cấp đạt chuẩn chống nước bụi hoàn toàn IP67, tích hợp trợ lý ảo thông minh và 3 micro mảng thu âm.',
    specs: {
      'Vật liệu': 'Nhôm Anodized, Polymer, Da tự nhiên thuộc thảo mộc',
      'Công suất': '2 x 30W Class D cho woofer và tweeter (Đỉnh 2x140W)',
      'Thời lượng pin': 'Lên đến 18 giờ liên tục',
      'Chuẩn kháng': 'IP67 chống nước và bụi bẩn hoàn toàn',
      'Kết nối': 'Bluetooth 5.1, hỗ trợ aptX Adaptive'
    },
    warranty: 'Bảo hành 24 tháng chính hãng Bang & Olufsen'
  },
  {
    id: 'prod-09',
    name: 'Apple Watch Ultra 2 Ocean Band',
    category: 'wearable',
    categoryName: 'Đồng hồ thông minh',
    price: 23990000,
    priceFormatted: '23.990.000₫',
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Siêu bền bỉ',
    badgeType: 'gold',
    stock: 0,
    rating: 4.7,
    reviewCount: 143,
    shortDesc: 'Vỏ Titanium 49mm cứng cáp, nút Action tùy biến cam nổi bật và chip S9 SiP với Neural Engine 4 nhân.',
    description: 'Apple Watch Ultra 2 là chiếc đồng hồ thông minh mạnh mẽ và bền bỉ nhất của Apple. Màn hình LTPO OLED sáng tới 3000 nits, GPS băng tần kép L1+L5 chính xác tuyệt đối, độ sâu lặn WR100 và EN13319, pin 36 giờ sử dụng thông thường.',
    specs: {
      'Kích thước': '49 x 44 x 14.4 mm, 61.4g (không dây đeo)',
      'Màn hình': '1.93" LTPO OLED Always-On 3000 nits',
      'Chip xử lý': 'Apple S9 SiP với Neural Engine 4 nhân',
      'Kháng nước': 'WR100, EN 13319, lặn sâu 40m',
      'Cảm biến': 'Nhiệt kế, ECG, SpO2, Phát hiện tai nạn xe'
    },
    warranty: 'Bảo hành 12 tháng chính hãng Apple Care'
  },
  {
    id: 'prod-10',
    name: 'Sony PlayStation 5 Pro Digital Edition',
    category: 'gaming',
    categoryName: 'Gaming',
    price: 18990000,
    priceFormatted: '18.990.000₫',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Next-Gen Gaming',
    badgeType: 'gold',
    stock: 2,
    rating: 4.8,
    reviewCount: 287,
    shortDesc: 'GPU nâng cấp 67% hiệu năng, Ray Tracing nâng cao và SSD tùy chỉnh 2TB siêu tốc cho trải nghiệm 4K 120fps.',
    description: 'PlayStation 5 Pro mang đến bước nhảy vọt về đồ họa với GPU mạnh hơn 67%, hỗ trợ PSSR (PlayStation Spectral Super Resolution) upscaling AI và Wi-Fi 7 cho streaming game cloud hoàn hảo. Thiết kế thanh mảnh hơn PS5 gốc.',
    specs: {
      'GPU': 'AMD RDNA 3 tùy chỉnh, 16.7 TFLOPS',
      'CPU': 'AMD Zen 2 8 nhân, 3.85 GHz',
      'RAM / Lưu trữ': '16GB GDDR6 / SSD NVMe 2TB',
      'Đầu ra video': 'HDMI 2.1, 4K 120Hz, 8K HDR',
      'Kết nối': 'Wi-Fi 7, Bluetooth 5.1, USB-C'
    },
    warranty: 'Bảo hành 12 tháng chính hãng Sony Interactive Entertainment'
  },
  {
    id: 'prod-11',
    name: 'Samsung Galaxy Tab S10 Ultra 14.6"',
    category: 'tablet',
    categoryName: 'Máy tính bảng',
    price: 32990000,
    priceFormatted: '32.990.000₫',
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Màn hình khổng lồ',
    badgeType: 'silver',
    stock: 10,
    rating: 4.5,
    reviewCount: 94,
    shortDesc: 'Màn hình Dynamic AMOLED 2X 14.6 inch khổng lồ, chip MediaTek Dimensity 9300+ và S-Pen đi kèm.',
    description: 'Máy tính bảng Android mạnh nhất thế giới với màn hình siêu lớn 14.6 inch tần số quét 120Hz, độ sáng 930 nits. Tích hợp sẵn S-Pen trong thân máy, hỗ trợ Samsung DeX biến tablet thành máy tính để bàn.',
    specs: {
      'Màn hình': '14.6" Dynamic AMOLED 2X, 2960 x 1848, 120Hz',
      'Vi xử lý': 'MediaTek Dimensity 9300+ for Galaxy',
      'RAM / ROM': '16GB LPDDR5X / 512GB UFS 4.0',
      'Camera': '13MP + 8MP Ultra Wide, Front 12MP + 12MP Ultra Wide',
      'Pin & Sạc': '11200 mAh, sạc nhanh 45W, kèm S-Pen'
    },
    warranty: 'Bảo hành 12 tháng chính hãng Samsung Việt Nam'
  },
  {
    id: 'prod-12',
    name: 'Bose QuietComfort Ultra Earbuds',
    category: 'audio',
    categoryName: 'Âm thanh',
    price: 8990000,
    priceFormatted: '8.990.000₫',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=900&auto=format&fit=crop'
    ],
    badge: 'Immersive Audio',
    badgeType: 'silver',
    stock: 25,
    rating: 4.6,
    reviewCount: 201,
    shortDesc: 'Công nghệ Bose Immersive Audio độc quyền, CustomTune cá nhân hóa âm thanh theo hình dáng tai bạn.',
    description: 'Tai nghe true wireless cao cấp nhất của Bose với công nghệ âm thanh không gian Immersive Audio đột phá. Chống ồn chủ động thế hệ mới với khả năng cách ly tiếng ồn tốt nhất phân khúc, pin 6 giờ sử dụng liên tục.',
    specs: {
      'Công nghệ âm thanh': 'Bose Immersive Audio, CustomTune',
      'Chống ồn': 'ANC thế hệ mới, Chế độ Aware',
      'Thời lượng pin': '6 giờ (tai nghe), 24 giờ cùng hộp sạc',
      'Kháng nước': 'IPX4 chống mồ hôi và nước bắn',
      'Kết nối': 'Bluetooth 5.3, Multipoint kết nối 2 thiết bị'
    },
    warranty: 'Bảo hành 12 tháng chính hãng Bose'
  }
];

// Coupon codes (for demo)
window.COUPONS = {
  'AURA10': { discount: 0.10, label: 'Giảm 10%', minOrder: 10000000 },
  'LUXE20': { discount: 0.20, label: 'Giảm 20%', minOrder: 30000000 },
  'WELCOME': { discount: 0.05, label: 'Giảm 5% cho khách mới', minOrder: 0 },
  'FREESHIP': { discount: 0, label: 'Miễn phí vận chuyển', minOrder: 0 }
};
