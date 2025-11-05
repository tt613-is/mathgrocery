/**
 * 价格计算测试脚本
 * 验证所有商品价格和折扣规则是否正确
 */

// 从index.html中复制的配置
const PRODUCTS = {
    lollipop: { name: "Lollipop", emoji: "🍭", price: 0.50 },
    apple: { name: "Apple", emoji: "🍎", price: 1.00 },
    donut_a: { name: "Donut A", emoji: "🍩", price: 2.50, emojiSize: "small" },
    donut_b: { name: "Donut B", emoji: "🍩", price: 2.55, emojiSize: "medium" },
    donut_c: { name: "Donut C", emoji: "🍩", price: 2.75, emojiSize: "large" },
    chips: { name: "Chips", emoji: "🍟", price: 1.20 },
    orange: { name: "Orange", emoji: "🍊", price: 3.00 },
    milk: { name: "Milk", emoji: "🥛", price: 1.50 },
    meat: { name: "Beef", emoji: "🥩", price: 15.00 },
    fish: { name: "Fish", emoji: "🐟", price: 15.00 },
    chicken: { name: "Chicken Leg", emoji: "🍗", price: 15.00 }
};

// 折扣规则
const DISCOUNT_RULES = [
    { productId: 'lollipop', quantity: 2, price: 0.70 }
];

// 货架配置中的价格标签
const PRICE_LABELS = {
    'donut-shelf': {
        items: [
            { name: '大 (Large)', price: '$2.75' },  // Donut C
            { name: '中 (Medium)', price: '$2.55' },  // Donut B
            { name: '小 (Small)', price: '$2.50' }   // Donut A
        ]
    },
    'snack-corner': {
        items: [
            { name: 'Lollipop', price: '$0.50' },
            { name: 'Chips', price: '$1.20' }
        ],
        discount: '2 Lollipops for $0.70'
    },
    'fruit-stand': {
        items: [
            { name: 'Apple', price: '$1.00' }
        ]
    },
    'seafood-freezer': {
        price: '$15.00'  // Fish
    },
    'meat-freezer': {
        items: [
            { name: 'Beef', price: '$15.00' },
            { name: 'Chicken', price: '$15.00' }
        ]
    }
};

/**
 * 计算订单总价（应用折扣规则）
 */
function calculateOrderTotal(order) {
    let totalPrice = 0;

    order.forEach(item => {
        const productId = item.productId;
        const quantity = item.quantity;
        const unitPrice = PRODUCTS[productId].price;

        // 查找适用的折扣规则
        const discountRule = DISCOUNT_RULES.find(
            rule => rule.productId === productId && rule.quantity <= quantity
        );

        if (discountRule) {
            // 有折扣：计算有多少套折扣商品
            const discountSets = Math.floor(quantity / discountRule.quantity);
            const remainder = quantity % discountRule.quantity;

            // 折扣价格 × 套数 + 单价 × 剩余数量
            totalPrice += discountRule.price * discountSets;
            totalPrice += unitPrice * remainder;

            console.log(`  ${PRODUCTS[productId].emoji} ${PRODUCTS[productId].name} x${quantity}: $${unitPrice} each`);
            console.log(`    → ${discountSets} sets at $${discountRule.price} + ${remainder} at $${unitPrice} = $${(discountRule.price * discountSets + unitPrice * remainder).toFixed(2)}`);
        } else {
            // 无折扣：直接按单价计算
            totalPrice += unitPrice * quantity;
            console.log(`  ${PRODUCTS[productId].emoji} ${PRODUCTS[productId].name} x${quantity}: $${unitPrice} each = $${(unitPrice * quantity).toFixed(2)}`);
        }
    });

    return parseFloat(totalPrice.toFixed(2));
}

/**
 * 验证价格标签与实际价格是否一致
 */
function verifyPriceLabels() {
    console.log('\n=== 验证价格标签 ===\n');

    let allCorrect = true;

    // 检查Donut价格
    console.log('📋 Donut货架 (donut-shelf):');
    const donutPrices = {
        'donut_c': { label: '$2.75', actual: PRODUCTS.donut_c.price },
        'donut_b': { label: '$2.55', actual: PRODUCTS.donut_b.price },
        'donut_a': { label: '$2.50', actual: PRODUCTS.donut_a.price }
    };

    for (const [id, prices] of Object.entries(donutPrices)) {
        const labelPrice = parseFloat(prices.label.replace('$', ''));
        const match = labelPrice === prices.actual;
        console.log(`  ${PRODUCTS[id].name}: 标签=${prices.label}, 实际=$${prices.actual} ${match ? '✅' : '❌'}`);
        if (!match) allCorrect = false;
    }

    // 检查零食角价格
    console.log('\n📋 零食角 (snack-corner):');
    console.log(`  Lollipop: 标签=$0.50, 实际=$${PRODUCTS.lollipop.price} ${PRODUCTS.lollipop.price === 0.50 ? '✅' : '❌'}`);
    console.log(`  Chips: 标签=$1.20, 实际=$${PRODUCTS.chips.price} ${PRODUCTS.chips.price === 1.20 ? '✅' : '❌'}`);
    console.log(`  折扣: 2 Lollipops for $0.70`);

    if (PRODUCTS.lollipop.price !== 0.50) allCorrect = false;
    if (PRODUCTS.chips.price !== 1.20) allCorrect = false;

    // 检查水果摊价格
    console.log('\n📋 水果摊 (fruit-stand):');
    console.log(`  Apple: 标签=$1.00, 实际=$${PRODUCTS.apple.price} ${PRODUCTS.apple.price === 1.00 ? '✅' : '❌'}`);
    if (PRODUCTS.apple.price !== 1.00) allCorrect = false;

    // 检查海鲜冰柜
    console.log('\n📋 海鲜冰柜 (seafood-freezer):');
    console.log(`  Fish: 标签=$15.00, 实际=$${PRODUCTS.fish.price} ${PRODUCTS.fish.price === 15.00 ? '✅' : '❌'}`);
    if (PRODUCTS.fish.price !== 15.00) allCorrect = false;

    // 检查肉类冰柜
    console.log('\n📋 肉类冰柜 (meat-freezer):');
    console.log(`  Beef: 标签=$15.00, 实际=$${PRODUCTS.meat.price} ${PRODUCTS.meat.price === 15.00 ? '✅' : '❌'}`);
    console.log(`  Chicken: 标签=$15.00, 实际=$${PRODUCTS.chicken.price} ${PRODUCTS.chicken.price === 15.00 ? '✅' : '❌'}`);
    if (PRODUCTS.meat.price !== 15.00) allCorrect = false;
    if (PRODUCTS.chicken.price !== 15.00) allCorrect = false;

    return allCorrect;
}

/**
 * 测试各种订单场景
 */
function runTests() {
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║   数学杂货店 - 价格计算测试                   ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    // 先验证价格标签
    const labelsCorrect = verifyPriceLabels();

    console.log('\n' + '='.repeat(50));
    console.log('=== 测试订单计算 ===\n');

    const testCases = [
        {
            name: '测试1: 买1个棒棒糖（无折扣）',
            order: [{ productId: 'lollipop', quantity: 1 }],
            expected: 0.50
        },
        {
            name: '测试2: 买2个棒棒糖（有折扣）',
            order: [{ productId: 'lollipop', quantity: 2 }],
            expected: 0.70
        },
        {
            name: '测试3: 买3个棒棒糖（1套折扣+1个原价）',
            order: [{ productId: 'lollipop', quantity: 3 }],
            expected: 1.20  // 0.70 + 0.50
        },
        {
            name: '测试4: 买4个棒棒糖（2套折扣）',
            order: [{ productId: 'lollipop', quantity: 4 }],
            expected: 1.40  // 0.70 * 2
        },
        {
            name: '测试5: 买5个棒棒糖（2套折扣+1个原价）',
            order: [{ productId: 'lollipop', quantity: 5 }],
            expected: 1.90  // 0.70 * 2 + 0.50
        },
        {
            name: '测试6: 混合订单（2棒棒糖+1苹果+1薯片）',
            order: [
                { productId: 'lollipop', quantity: 2 },
                { productId: 'apple', quantity: 1 },
                { productId: 'chips', quantity: 1 }
            ],
            expected: 2.90  // 0.70 + 1.00 + 1.20
        },
        {
            name: '测试7: 甜甜圈A/B/C各1个',
            order: [
                { productId: 'donut_a', quantity: 1 },
                { productId: 'donut_b', quantity: 1 },
                { productId: 'donut_c', quantity: 1 }
            ],
            expected: 7.80  // 2.50 + 2.55 + 2.75
        },
        {
            name: '测试8: 高价商品（1牛肉+1鱼+1鸡腿）',
            order: [
                { productId: 'meat', quantity: 1 },
                { productId: 'fish', quantity: 1 },
                { productId: 'chicken', quantity: 1 }
            ],
            expected: 45.00  // 15 + 15 + 15
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        console.log(`\n${test.name}:`);
        const actual = calculateOrderTotal(test.order);
        const match = Math.abs(actual - test.expected) < 0.01;

        console.log(`  期望总价: $${test.expected.toFixed(2)}`);
        console.log(`  实际总价: $${actual.toFixed(2)}`);
        console.log(`  结果: ${match ? '✅ 通过' : '❌ 失败'}`);

        if (match) {
            passed++;
        } else {
            failed++;
            console.log(`  ⚠️  差额: $${Math.abs(actual - test.expected).toFixed(2)}`);
        }
    });

    // 总结
    console.log('\n' + '='.repeat(50));
    console.log('=== 测试总结 ===\n');
    console.log(`价格标签验证: ${labelsCorrect ? '✅ 全部正确' : '❌ 有错误'}`);
    console.log(`测试用例: ${testCases.length}个`);
    console.log(`通过: ${passed}个 ✅`);
    console.log(`失败: ${failed}个 ❌`);
    console.log(`成功率: ${((passed / testCases.length) * 100).toFixed(1)}%`);

    if (failed === 0 && labelsCorrect) {
        console.log('\n🎉 所有测试通过！价格计算逻辑正确！');
    } else {
        console.log('\n⚠️  发现问题，请检查上面的错误详情。');
    }

    console.log('\n' + '='.repeat(50));
}

// 运行测试
runTests();
