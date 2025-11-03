# 📄 JSON配置文件编辑指南 (方案A)

## 🎯 简介

这是**直接编辑JSON配置文件**的指南，适合需要**精细控制**或**批量修改**的场景。

适合：程序员、熟悉JSON格式的用户，或需要实现配置页面无法完成的高级功能。

---

## 📁 配置文件位置

```
/Users/WesleyBao/Documents/Workspace/Web/MathGroccery/game-config.json
```

---

## 🚀 快速开始

### 1. 打开配置文件

#### 方法A：使用文本编辑器
```bash
# macOS 推荐使用
open -a "Visual Studio Code" game-config.json
# 或
open -a "TextEdit" game-config.json
# 或
nano game-config.json
```

#### 方法B：直接用编辑器打开
- 使用 VS Code、Sublime Text、Atom 等
- 右键 → 打开方式 → 选择编辑器

### 2. 编辑并保存
- 修改JSON内容
- 保存文件（Cmd+S）

### 3. 测试游戏
```bash
# 启动本地服务器
python3 -m http.server 8080

# 浏览器打开
# http://localhost:8080/index.html
```

---

## 📐 配置文件结构

### 完整结构概览
```json
{
  "version": "0.3.1",
  "customerArea": { ... },
  "products": { ... },
  "shelves": [ ... ],
  "cashRegister": { ... }
}
```

---

## 🏗️ 详细字段说明

### 1. 版本信息
```json
{
  "version": "0.3.1"
}
```
- **version**: 配置文件版本号（字符串）

---

### 2. 顾客区域配置
```json
{
  "customerArea": {
    "height": "25vh",
    "background": "linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)"
  }
}
```

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `height` | string | 顾客区域高度 | `"25vh"`, `"200px"` |
| `background` | string | 背景样式 | CSS渐变或颜色 |

---

### 3. 商品库配置
```json
{
  "products": {
    "lollipop": {
      "name": "棒棒糖",
      "emoji": "🍭",
      "price": 0.50
    },
    "apple": {
      "name": "苹果",
      "emoji": "🍎",
      "price": 1.00
    }
  }
}
```

#### 商品对象字段
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `商品ID` | string | 键名，唯一标识符 | `"lollipop"`, `"donut_a"` |
| `name` | string | 商品显示名称 | `"棒棒糖"` |
| `emoji` | string | 商品表情符号 | `"🍭"` |
| `price` | number | 商品价格 | `0.50`, `2.75` |

#### 添加新商品
```json
{
  "products": {
    ...现有商品...,
    "banana": {
      "name": "香蕉",
      "emoji": "🍌",
      "price": 1.50
    }
  }
}
```

---

### 4. 货架配置（核心部分）

#### 基本格式
```json
{
  "shelves": [
    {
      "id": "donut-top",
      "name": "甜甜圈C区",
      "type": "donut-shelf",
      "position": { "left": "0", "top": "8vh" },
      "size": { "width": "120px", "height": "20vh" },
      "layout": "vertical",
      "products": ["donut_c", "donut_c", "donut_c"],
      "style": "shelf-area-tower",
      "priceLabel": {
        "show": true,
        "position": "right",
        "price": "$2.75"
      }
    }
  ]
}
```

#### 货架对象字段详解

| 字段 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `id` | string | ✅ | 唯一标识符 | `"donut-top"` |
| `name` | string | ✅ | 显示名称 | `"甜甜圈C区"` |
| `type` | string | ✅ | 货架类型标签 | `"donut-shelf"` |
| `position` | object | ✅ | 位置对象 | 见下表 |
| `size` | object | ✅ | 尺寸对象 | 见下表 |
| `layout` | string | ✅ | 布局类型 | 见下表 |
| `products` | array | ✅ | 商品数组 | 见下表 |
| `style` | string | ❌ | CSS类名 | `"shelf-area-tower"` |
| `gridConfig` | object | 条件 | grid布局配置 | `{"rows": 2, "cols": 3}` |
| `priceLabel` | object | ❌ | 价格标签配置 | 见下表 |

---

#### Position（位置）对象
```json
{
  "position": {
    "left": "0",
    "top": "8vh"
  }
}
```

**定位属性**（至少选择2个）：
| 属性 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `left` | string | 距左边距离 | `"0"`, `"10px"`, `"5vw"` |
| `right` | string | 距右边距离 | `"20px"` |
| `top` | string | 距顶部距离 | `"8vh"`, `"100px"` |
| `bottom` | string | 距底部距离 | `"0"` |

**常见组合：**
```json
// 左上角定位
{ "left": "0", "top": "8vh" }

// 右上角定位
{ "right": "20px", "top": "15vh" }

// 左下角定位
{ "left": "0", "bottom": "0" }

// 右下角定位
{ "right": "20px", "bottom": "5vh" }
```

---

#### Size（尺寸）对象
```json
{
  "size": {
    "width": "120px",
    "height": "20vh"
  }
}
```

| 属性 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `width` | string | 宽度 | `"120px"`, `"15vw"` |
| `height` | string | 高度 | `"20vh"`, `"200px"` |

---

#### Layout（布局类型）

| 值 | 说明 | 适用场景 | 额外配置 |
|------|------|----------|----------|
| `"vertical"` | 垂直排列 | 甜甜圈塔 | 无 |
| `"grid"` | 网格布局 | 零食角 | 需要 `gridConfig` |
| `"rows"` | 分层展示 | 水果台 | 商品需要row属性 |
| `"scattered"` | 散列布局 | 海鲜冰柜 | 无 |
| `"mixed"` | 混合布局 | 肉类冰柜 | 无 |

**Grid布局额外配置：**
```json
{
  "layout": "grid",
  "gridConfig": {
    "rows": 2,
    "cols": 3
  }
}
```

---

#### Products（商品）数组

**简单格式**（用于vertical/grid/scattered/mixed）：
```json
{
  "products": ["donut_c", "donut_c", "donut_c"]
}
```
- 数组元素是商品ID字符串
- 可以重复（表示多个相同商品）

**复杂格式**（用于rows布局）：
```json
{
  "products": [
    { "row": "top", "items": ["apple", "apple"] },
    { "row": "middle", "items": ["apple", "apple", "apple"] },
    { "row": "bottom", "items": [] }
  ]
}
```

---

#### PriceLabel（价格标签）对象

**简单格式**（单一价格）：
```json
{
  "priceLabel": {
    "show": true,
    "position": "right",
    "price": "$2.75"
  }
}
```

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `show` | boolean | 是否显示 | `true`, `false` |
| `position` | string | 显示位置 | `"right"`, `"top"` |
| `price` | string | 价格文本 | `"$2.75"` |

**复杂格式**（多商品价格）：
```json
{
  "priceLabel": {
    "show": true,
    "productName": "Snacks",
    "items": [
      { "name": "Lollipop", "price": "$0.50" },
      { "name": "Chips", "price": "$1.20" }
    ],
    "unit": "each",
    "discount": "2 Lollipops for $0.90"
  }
}
```

| 字段 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `show` | boolean | ✅ | 是否显示 | `true` |
| `productName` | string | ❌ | 商品类别名称 | `"Snacks"` |
| `items` | array | ❌ | 商品价格列表 | 见上例 |
| `price` | string | ❌ | 单一价格 | `"$15.00"` |
| `unit` | string | ❌ | 单位 | `"each"` |
| `discount` | string | ❌ | 折扣信息 | `"Buy 2 get 10% off"` |

---

### 5. 钱箱配置
```json
{
  "cashRegister": {
    "0.05": 10,
    "0.10": 10,
    "0.20": 10,
    "0.50": 10,
    "1": 20,
    "2": 10,
    "5": 10,
    "10": 10,
    "50": 5
  }
}
```

| 键 | 类型 | 说明 | 值类型 |
|------|------|------|--------|
| `"币值"` | string | 币额（字符串格式） | number (库存数量) |

---

## 📝 常见操作示例

### 示例1：修改商品价格
**需求**：将甜甜圈C的价格从 $2.75 改为 $3.00

```json
{
  "products": {
    "donut_c": {
      "name": "甜甜圈C",
      "emoji": "🍩",
      "price": 3.00  // 修改这里
    }
  },
  "shelves": [
    {
      "id": "donut-top",
      ...
      "priceLabel": {
        "show": true,
        "position": "right",
        "price": "$3.00"  // 同时修改这里
      }
    }
  ]
}
```

---

### 示例2：调整货架位置
**需求**：将甜甜圈C区向下移动10vh

```json
{
  "shelves": [
    {
      "id": "donut-top",
      "position": {
        "left": "0",
        "top": "18vh"  // 从 8vh 改为 18vh
      }
    }
  ]
}
```

---

### 示例3：增加商品数量
**需求**：零食角增加2个棒棒糖

```json
{
  "shelves": [
    {
      "id": "snack-corner",
      "products": [
        "lollipop", "lollipop", "lollipop", "lollipop", "lollipop",  // 从3个改为5个
        "chips", "chips", "chips"
      ]
    }
  ]
}
```

---

### 示例4：修改网格布局
**需求**：零食角从2行3列改为3行2列

```json
{
  "shelves": [
    {
      "id": "snack-corner",
      "layout": "grid",
      "gridConfig": {
        "rows": 3,  // 从 2 改为 3
        "cols": 2   // 从 3 改为 2
      }
    }
  ]
}
```

---

### 示例5：新增货架
**需求**：添加一个饮料区

```json
{
  "shelves": [
    ...现有货架...,
    {
      "id": "drinks-area",
      "name": "饮料区",
      "type": "beverage-shelf",
      "position": { "left": "300px", "top": "30vh" },
      "size": { "width": "150px", "height": "25vh" },
      "layout": "grid",
      "gridConfig": { "rows": 2, "cols": 2 },
      "products": ["milk", "milk", "milk", "milk"],
      "style": "shelf-area-grid",
      "priceLabel": {
        "show": true,
        "productName": "Milk",
        "price": "$1.50",
        "unit": "each",
        "discount": null
      }
    }
  ]
}
```

---

### 示例6：删除货架
**需求**：删除水果展示台

找到该货架对象，整个删除（包括逗号）：
```json
{
  "shelves": [
    {...},
    // 删除这整个对象
    // {
    //   "id": "fruit-stand",
    //   ...
    // },
    {...}
  ]
}
```

---

## ⚠️ 常见错误与解决

### 错误1：多余的逗号
```json
// ❌ 错误
{
  "shelves": [
    {...},
    {...},  // 最后一个元素后面不能有逗号
  ]
}

// ✅ 正确
{
  "shelves": [
    {...},
    {...}
  ]
}
```

---

### 错误2：缺少引号
```json
// ❌ 错误
{
  id: "donut-top",  // 键必须有引号
  price: $2.75      // 字符串值必须有引号
}

// ✅ 正确
{
  "id": "donut-top",
  "price": "$2.75"
}
```

---

### 错误3：ID重复
```json
// ❌ 错误
{
  "shelves": [
    { "id": "snack-corner", ... },
    { "id": "snack-corner", ... }  // 重复ID
  ]
}

// ✅ 正确
{
  "shelves": [
    { "id": "snack-corner", ... },
    { "id": "snack-corner-2", ... }
  ]
}
```

---

### 错误4：数组格式错误
```json
// ❌ 错误
{
  "products": "donut_c"  // 应该是数组
}

// ✅ 正确
{
  "products": ["donut_c"]
}
```

---

## 🔧 JSON验证工具

### 在线验证器
推荐使用以下网站验证JSON格式：
- [JSONLint](https://jsonlint.com/)
- [JSON Formatter](https://jsonformatter.curiousconcept.com/)

### VS Code插件
安装插件自动验证：
- JSON Tools
- Prettier（代码格式化）

---

## 💡 高级技巧

### 1. 批量修改位置
使用编辑器的查找替换功能：
```
查找: "top": "8vh"
替换: "top": "10vh"
```

### 2. 快速复制货架
```json
{
  "shelves": [
    {
      "id": "donut-top",
      ...
    },
    // 复制上面的对象，修改ID和部分属性
    {
      "id": "donut-top-copy",
      ...
    }
  ]
}
```

### 3. 使用注释（开发时）
JSON标准不支持注释，但可以临时添加：
```json
{
  "_comment": "这是甜甜圈区域配置",
  "id": "donut-top"
}
```
注意：游戏加载时会忽略 `_comment` 字段

### 4. 导出模板
保存一个 `template.json` 文件，包含常用货架模板，需要时复制粘贴。

---

## 🚨 注意事项

1. **JSON格式严格**
   - 所有字符串必须用双引号 `"`
   - 对象最后一个属性后**不能有逗号**
   - 数组最后一个元素后**不能有逗号**

2. **单位必填**
   - 位置和尺寸必须带单位：`"120px"` 而不是 `"120"`

3. **ID唯一性**
   - 所有货架的 `id` 必须唯一
   - 商品ID必须存在于 `products` 对象中

4. **保存后刷新**
   - 修改配置文件后，必须**刷新浏览器**才能看到效果
   - 使用 Cmd+R (Mac) 或 Ctrl+R (Windows/Linux)

5. **备份配置**
   - 修改前先复制一份备份：`cp game-config.json game-config.backup.json`

6. **文件编码**
   - 确保文件编码为 **UTF-8**（支持中文和表情符号）

---

## 📞 故障排除

### 问题1：游戏无法启动
**可能原因**：JSON格式错误

**解决方法**：
1. 打开浏览器控制台（F12）
2. 查看错误信息
3. 使用 [JSONLint](https://jsonlint.com/) 验证JSON格式
4. 修复语法错误

---

### 问题2：货架位置不对
**可能原因**：单位错误或值超出范围

**解决方法**：
1. 检查单位是否正确（px、vh、vw、%）
2. 检查数值是否合理（不要太大或负数）
3. 使用配置页面（config.html）预览效果

---

### 问题3：商品不显示
**可能原因**：商品ID不存在

**解决方法**：
1. 检查 `products` 数组中的ID是否存在于 `products` 对象
2. 确认拼写正确（区分大小写）
3. 查看浏览器控制台是否有错误

---

### 问题4：价格标签不显示
**可能原因**：`show` 字段为 `false`

**解决方法**：
```json
{
  "priceLabel": {
    "show": true,  // 确保为 true
    "price": "$2.75"
  }
}
```

---

## 🔗 相关资源

- **配置页面指南**：`CONFIG_GUIDE.md`（方案B，图形界面）
- **JSON语法参考**：[MDN JSON文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- **在线JSON编辑器**：[JSON Editor Online](https://jsoneditoronline.org/)

---

## ✨ 小贴士

- 使用VS Code等编辑器，可以自动高亮和格式化JSON
- 每次修改后用JSONLint验证，避免语法错误
- 善用编辑器的搜索功能快速定位要修改的部分
- 修改前先备份，避免误操作导致配置丢失

祝你编辑愉快！🎉
