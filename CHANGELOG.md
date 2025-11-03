# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.4.0] - 2025-01-04

### 🎯 Major Changes: 等式记录器重构 (Equation Recorder)

**核心概念转变**：从实物币额选择改为等式记录器输入

### Added
- **等式记录器系统**：全新的输入方式
  - 倒三角形按钮布局（1234 → 567 → 89 → 0🔙）
  - 绿色渐变显示屏（#4caf50 → #66bb6a）
  - 红色圆形送出按钮（⬆️）在显示屏右侧
  - 支持完整等式输入（如：`10-7.5=2.5`）
  - 支持直接结果输入（如：`2.5`）
  - 退格删除功能（🔙按钮）

- **配置管理系统**：
  - `game-config.json` - 外部JSON配置文件
  - `config.html` - 可视化配置页面（3列布局：货架列表 | 编辑表单 | 实时预览）
  - `CONFIG_GUIDE.md` - 图形界面配置指南（400+行）
  - `JSON_GUIDE.md` - JSON直接编辑指南（500+行）
  - 配置加载机制：优先外部JSON，失败则使用内嵌默认配置

- **配置功能**：
  - 可视化编辑货架位置和尺寸
  - 导出/导入JSON配置文件
  - 保存到LocalStorage
  - 实时预览效果

### Changed
- **计算器布局**：
  - 按钮布局从散列改为倒三角形（inverted triangle）
  - 送出按钮从按钮网格移到显示屏右侧
  - 显示屏宽度缩短为 `flex: 1`，为送出按钮腾出空间
  - 添加提示文字："Enter equation or result (e.g., 10-7.5=2.5 or 2.5)"

- **找零逻辑**：
  - 从实物币额选择改为数字/等式输入
  - 支持两种验证模式：提取等号右边值 或 解析整个输入
  - 移除所有币额选择相关代码

- **UI风格**：
  - 蓝色渐变主背景（#1e3c72 → #2a5298）
  - 黑色圆形数字按钮（70x70px）
  - 紫色操作符按钮（+、-、×、÷、=、.）

### Technical
- **核心函数**：
  - `inputDigit(digit)` - 添加数字到显示屏
  - `inputSymbol(symbol)` - 添加操作符到显示屏
  - `backspace()` - 删除最后一个字符
  - `extractChangeAmount()` - 从等式中提取找零金额（支持两种格式）
  - `submitChange()` - 验证找零并显示反馈
  - `updateEquationDisplay()` - 更新显示屏内容

- **配置系统架构**：
  - 异步配置加载：`async loadConfig()`
  - 配置渲染逻辑：`initShelfAreas()`, `renderShelfArea()`
  - 三层分离：配置层、渲染层、样式层

### Removed
- 新加坡币系统（9种币额）
- 实物币额选择界面
- 钱箱管理系统
- 币额库存显示
- Reset按钮和币额撤销逻辑

---

### 🏷️ Price Label System (from v0.3.0+)

**UI Improvements:**
- 📋 **Unified Price Labels**: Each shelf area now has a single price label instead of individual item prices
- 🏪 **Supermarket-Style Display**: Labels show product names, prices, and currency units
- 💰 **Flexible Pricing**: Supports single prices, multiple prices, and item lists
- 🎁 **Discount Tags**: Special discount information (e.g., "2 Lollipops for $0.90") with 🏷️ icon
- 🎨 **Clean Design**: Orange-bordered white labels with shadow effects
- 💬 **Dialog Bubble Fix**: Customer dialog now properly positioned next to avatar (speech bubble style)

**Implementation:**
- `priceLabel` configuration in `SHELF_CONFIG`
- Multiple display formats:
  - Single price: `{ productName, price, unit, discount }`
  - Multiple prices: `{ productName, prices[], unit, discount }`
  - Item list: `{ productName, items[{name, price}], unit, discount }`
- Removed individual price display from product cards
- Dynamic label rendering in `renderShelfArea()`

**Product Changes:**
- Fruit Stand: Now displays 5 apples (removed oranges and milk)
- Updated price labels accordingly

**Examples:**
- Donuts: "$2.00, $2.50, $3.00 each"
- Snacks: "Lollipop $0.50, Chips $1.20 each" + discount "2 Lollipops for $0.90"
- Fish: "$15.00 each"
- Apples: "$1.00 each"

### ✨ Animation & Polish Enhancements

**Visual Improvements:**
- 🎬 **Customer Entrance**: Smooth fade-in and slide animation
- 💬 **Dialog Bounce**: Playful bounce effect when customer speaks
- 🛍️ **Bag Shake**: Shopping bag shakes when items are added
- 📦 **Item Pick Animation**: Items pulse and rotate when picked
- 💰 **Coin Selection Pulse**: Coins glow and scale when selected/deselected
- 🏪 **Shelf Fade-In**: Shelves smoothly appear on load
- 🎯 **Cashier Slide-In**: Cash register slides in from top
- 🎊 **Feedback Bounce**: Result screen bounces in dramatically
- 😊 **Emoji Pop**: Feedback emoji pops with rotation effect
- 🔘 **Button Ripple**: Ripple effect on button hover
- ⚡ **Smooth Transitions**: All interactions feel fluid and responsive

**Technical:**
- Added 10+ CSS keyframe animations
- Enhanced hover states with transform effects
- Implemented ripple effect using ::before pseudo-elements
- Optimized animation timing for natural feel
- Used cubic-bezier easing for bounce effects

## [0.3.0] - 2025-01-03

### 🎮 Complete Cashier Simulation Redesign

**Major Changes: From Shopping Cart to Real Cashier Experience**
- Complete game flow redesign based on hand-drawn sketches
- Removed shopping cart concept → Implemented "Customer orders → Shopkeeper picks items" flow
- Changed from "input numbers" to "select physical denominations" for change-making
- Introduced Singapore Dollar currency system
- Full English UI localization

### Added - Game Mechanics
- ✨ **Item Instance System**
  - Each item icon has a unique ID (item_0, item_1...)
  - Customer wants 2 milk → Must click 2 different milk icons
  - Clicked items turn gray (opacity: 0.3) and become non-clickable
  - Shelf resets at the start of each round
- 🎯 **Smart Order Generation**
  - Counts actual quantity of each product on shelves
  - Customer demands never exceed shelf inventory
  - Generates 2-3 product types per order
- 💰 **Singapore Dollar System**
  - Coins: $0.05, $0.10, $0.20, $0.50, $1
  - Notes: $2, $5, $10, $50
  - Cash register with limited stock per denomination
- 🔄 **Toggle Coin Selection**
  - Click coin button → Yellow highlight (#ffc107)
  - Click again → Deselect (toggle)
  - Real-time display: "Selected ×2 (8 left)"
  - "Reset" button to clear all selections

### Added - UI/UX
- 🏪 **3-Area Layout (25vh + 75vh)**
  - Top: Customer area (avatar + dialog + bag)
  - Bottom: Shelves (left) + Cash register (center)
- 👤 **Customer Area Redesign**
  - Avatar moved to bottom edge (80px, centered)
  - Dialog bubble positioned at top-right of avatar
  - Customer bag fixed at top-right corner
- 🛒 **5 Configurable Shelf Areas**
  - Donut Tower (left, 3 vertical layers)
  - Snack Corner (left-bottom, 2x3 grid)
  - Fruit Stand (center, 3-row shelves)
  - Seafood Freezer (right-top)
  - Meat Freezer (right-bottom)
- 💵 **Cash Register Panel**
  - 9 denomination buttons with stock display
  - Order summary and payment info
  - Selected amount counter
  - Confirm/Reset buttons

### Changed
- 🎨 Complete UI overhaul with new layout
- 🔄 4-stage game flow: Order → Pick Items → Make Change → Feedback
- 💵 Product pricing adjusted for SGD (precision to $0.05)
- 🌐 All UI text converted to English
- 📦 Product prices: Lollipop $0.50, Apple $1.00, Donuts $2/$2.50/$3, Meat $15

### Technical - Architecture
- **Configuration-Driven Shelf System (Approach C)**
  - `SHELF_CONFIG`: Define all shelf areas (position, size, layout, products)
  - `initShelfAreas()`: Render shelves from config
  - `createProductItem()`: Generate unique ID for each item instance
- **Game State Management**
  - 4 phases: order_received → picking_items → making_change → result
  - `itemIdCounter`: Auto-increment for unique item IDs
  - `selectedCoins`: Object tracking selected denominations
- **CSS State Classes**
  - `.picked`: Grayed-out selected items
  - `.selected`: Yellow-highlighted coin buttons
- **Smart Order Validation**
  - Checks if item is in order
  - Prevents over-picking same item
  - Auto-advances when order complete

### Fixed
- 🍎 Apple price correction: $3 → $1

## [0.2.0] - 2025-01-02

### 🎮 游戏玩法重构

**重大变更：从被动计算到主动交互**
- 玩家现在可以主动选择商品（点击货架）
- 添加购物车功能（可添加/移除商品）
- 分阶段游戏流程：选择商品 → 确认订单 → 计算找零
- 更接近真实收银场景

### Added
- ✨ 商品货架展示（网格布局，响应式）
- 🛒 购物车系统
  - 点击商品添加到购物车
  - 移除按钮可删除已选商品
  - 实时显示已选商品列表
- 🎯 游戏状态管理系统
  - 三阶段流程：selecting → checkout → result
  - 防止跨阶段误操作
- 💚 确认订单按钮（绿色，购物车非空时显示）
- 📱 更宽的布局（max-width: 900px）

### Changed
- 🎨 UI完全重构：从单列布局改为货架+购物车布局
- 🔄 游戏流程：从"系统生成订单"改为"玩家选择商品"
- 📦 商品数据添加ID字段用于标识

### Technical
- 状态机模式管理游戏阶段
- 购物车基于数组动态渲染
- UI分阶段显示/隐藏控制
- 代码完全重写，优化结构

## [0.1.1] - 2025-01-02

### Changed
- 💰 支持小数价格系统
  - 所有价格和计算支持小数点后2位
  - 使用 `toFixed(2)` 处理浮点数精度问题
  - 货币符号从 ¥ 改为 $
- 🛍️ 更新商品库为11种商品：
  - 苹果 🍎 $1
  - 甜甜圈A 🍩 $2
  - 甜甜圈B 🍩 $2.5
  - 甜甜圈C 🍩 $2.7
  - 肉 🥩 $56.3
  - 鱼 🐟 $56.3
  - 鸡腿 🍗 $56.3（新增）
  - Milk 🥛 $5
  - 薯片 🍟 $1.2
  - 橡皮 🧽 $3
  - 棒棒糖 🍭 $0.5

### Added
- ✨ 甜甜圈分为A/B/C三种型号，增加游戏多样性

### Technical
- 优化浮点数计算逻辑，确保精度正确
- 更新价格显示格式，统一保留两位小数

## [0.1.0] - 2025-01-02

### Added
- 🎮 核心游戏功能
  - 随机生成订单（2-3个商品）
  - 找零计算和判断
  - 对错反馈（表情显示）
  - "再来一单"功能
- 📦 固定商品库（6种商品）
- 🎨 简洁的卡片式UI设计
- 📱 响应式布局支持

### Technical
- 单文件HTML架构
- 纯JavaScript实现，无框架依赖
- 使用整数价格避免浮点数精度问题

---

**版本说明：**
- 版本号格式：主版本号.次版本号.修订号
- [Unreleased] - 开发中的功能
- [x.x.x] - 已发布的版本
