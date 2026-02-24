// Netlify Function for Retirement Simulator

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
            },
            body: ''
        };
    }

    const translations = {
        en: {
            noticeTittle: "📌 Calculation Logic:",
            noticeOne: "1. Beginning of year: Balance - Annual Spending",
            noticeTwo: "2. End of year: Balance × (1 + Return Rate)",
            title: "FIRE Retirement Simulator",
            initialDeposit: "Initial Deposit",
            monthlyContribution: "Monthly Contribution",
            annualSpending: "Annual Spending (%)",
            avgReturn: "Avg Annual Return (%)",
            years: "Simulation Years",
            runBtn: "🚀 Run Simulation",
            summaryInitial: "Initial Deposit",
            summarySpending: "Annual Spending",
            summaryMonthly: "(Monthly",
            summaryContribution: "Monthly Contribution",
            finalBest: "Final Balance (Best)",
            finalWorst: "Final Balance (Worst)",
            chartTitle: "📊 Portfolio Balance Over Time",
            tableTitle: "📋 Yearly Details",
            tableYear: "Year",
            goodFirst: "Good Years First",
            badFirst: "Bad Years First",
            random: "Random",
            average: "Average",
            yearLabel: "Year",
            unit: "USD"
        },
        ja: {
            noticeTittle: "📌 計算ロジック：",
            noticeOne: "1. 年初：残高 - 年間支出",
            noticeTwo: "2. 年末：残高 × (1 + 収益率)",
            title: "FIRE 老後資金シミュレーター",
            initialDeposit: "初期投資額",
            monthlyContribution: "月額投資額",
            annualSpending: "年間支出 (%)",
            avgReturn: "平均年間収益率 (%)",
            years: "シミュレーション年数",
            runBtn: "🚀 シミュレーション開始",
            summaryInitial: "初期投資額",
            summarySpending: "年間支出",
            summaryMonthly: "(月額",
            summaryContribution: "月額投資額",
            finalBest: "最終残高 (最高)",
            finalWorst: "最終残高 (最低)",
            chartTitle: "📊 資産推移",
            tableTitle: "📋 年間詳細",
            tableYear: "年",
            goodFirst: "好況年先行",
            badFirst: "不況年先行",
            random: "ランダム",
            average: "平均",
            yearLabel: "年",
            unit: "万円"
        },
        zh: {
            noticeTittle: "📌 计算逻辑：",
            noticeOne: "1. 年初：余额 - 年度支出",
            noticeTwo: "2. 年末：余额 × (1 + 回报率)",
            title: "FIRE 退休模拟器",
            initialDeposit: "初始存款",
            monthlyContribution: "每月投资额",
            annualSpending: "年支出 (%)",
            avgReturn: "平均年利率 (%)",
            years: "模拟年数",
            runBtn: "🚀 运行模拟",
            summaryInitial: "初始存款",
            summarySpending: "年支出",
            summaryMonthly: "(每月",
            summaryContribution: "每月投资",
            finalBest: "最终余额 (最佳)",
            finalWorst: "最终余额 (最差)",
            chartTitle: "📊 资产变化曲线",
            tableTitle: "📋 年度详情",
            tableYear: "年",
            goodFirst: "好年先行",
            badFirst: "坏年先行",
            random: "随机",
            average: "平均",
            yearLabel: "年",
            unit: "万元"
        },
        ko: {
            noticeTittle: "📌 계산 방식：",
            noticeOne: "1. 연초：잔액 - 연간 지출액",
            noticeTwo: "2. 연말：잔액 × (1 + 수익률)",
            title: "FIRE 은퇴 시뮬레이터",
            initialDeposit: "초기 예금",
            monthlyContribution: "월 투자액",
            annualSpending: "연간 지출 (%)",
            avgReturn: "평균 연간 수익률 (%)",
            years: "시뮬레이션 기간",
            runBtn: "🚀 시뮬레이션 실행",
            summaryInitial: "초기 예금",
            summarySpending: "연간 지출",
            summaryMonthly: "(월",
            summaryContribution: "월 투자액",
            finalBest: "최종 잔고 (최고)",
            finalWorst: "최종 잔고 (최저)",
            chartTitle: "📊 자산 추이",
            tableTitle: "📋 연간 상세",
            tableYear: "년",
            goodFirst: "호황년 선행",
            badFirst: "불황년 선행",
            random: "랜덤",
            average: "평균",
            yearLabel: "년",
            unit: "만원"
        },
        th: {
            noticeTittle: "📌 หลักการคำนวณ：",
            noticeOne: "1. ต้นปี：ยอดคงเหลือ - รายจ่ายประจำปี",
            noticeTwo: "2. สิ้นปี：ยอดคงเหลือ × (1 + อัตราผลตอบแทน)",
            title: "เครื่องมือคำนวณเกษียณ FIRE",
            initialDeposit: "เงินลงทุนเริ่มต้น",
            monthlyContribution: "เงินลงทุนรายเดือน",
            annualSpending: "ค่าใช้จ่ายรายปี (%)",
            avgReturn: "อัตราผลตอบแทนเฉลี่ยต่อปี (%)",
            years: "จำนวนปีที่จำลอง",
            runBtn: "🚀 เริ่มการจำลอง",
            summaryInitial: "เงินลงทุนเริ่มต้น",
            summarySpending: "ค่าใช้จ่ายรายปี",
            summaryMonthly: "(รายเดือน",
            summaryContribution: "เงินลงทุนรายเดือน",
            finalBest: "ยอดคงเหลือ (สูงสุด)",
            finalWorst: "ยอดคงเหลือ (ต่ำสุด)",
            chartTitle: "📊 การเปลี่ยนแปลงสินทรัพย์",
            tableTitle: "📋 รายละเอียดประจำปี",
            tableYear: "ปี",
            goodFirst: "ปีดีนำ",
            badFirst: "ปีแย่นำ",
            random: "สุ่ม",
            average: "เฉลี่ย",
            yearLabel: "ปี",
            unit: "THB"
        },
        vi: {
            noticeTittle: "📌 Công thức tính toán：",
            noticeOne: "1. Đầu năm：Số dư - Chi tiêu hàng năm",
            noticeTwo: "2. Cuối năm：Số dư × (1 + Tỷ lệ hoàn trả)",
            title: "Công cụ Tính Toán Hưu trí FIRE",
            initialDeposit: "Tiền gửi ban đầu",
            monthlyContribution: "Đầu tư hàng tháng",
            annualSpending: "Chi tiêu hàng năm (%)",
            avgReturn: "Lợi nhuận trung bình năm (%)",
            years: "Số năm mô phỏng",
            runBtn: "🚀 Chạy Mô phỏng",
            summaryInitial: "Tiền gửi ban đầu",
            summarySpending: "Chi tiêu năm",
            summaryMonthly: "(Hàng tháng",
            summaryContribution: "Đầu tư hàng tháng",
            finalBest: "Số dư cuối (Tốt nhất)",
            finalWorst: "Số dư cuối (Tệ nhất)",
            chartTitle: "📊 Biến động Tài sản",
            tableTitle: "📋 Thông tin hàng năm",
            tableYear: "Năm",
            goodFirst: "Năm tốt trước",
            badFirst: "Năm xấu trước",
            random: "Ngẫu nhiên",
            average: "Trung bình",
            yearLabel: "Năm",
            unit: "VND"
        }
    };

    function getRandomReturn(avg, stdDev) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        let returnRate = avg + z * stdDev;
        const minRate = avg - 3 * Math.abs(avg);
        const maxRate = avg + 3 * Math.abs(avg);
        returnRate = Math.max(minRate, Math.min(maxRate, returnRate));
        return returnRate / 100;
    }

    function generateScenarios(initialDeposit, monthlyContribution, annualSpendingPercent, avgReturn, years) {
        const annualSpending = initialDeposit * (annualSpendingPercent / 100);
        const monthlySpending = annualSpending / 12;
        const stdDev = Math.abs(avgReturn) * 0.5;
        
        const scenarios = {
            goodYearsFirst: [],
            badYearsFirst: [],
            random: [],
            average: []
        };
        
        const returns = Array(years).fill(0).map(() => getRandomReturn(avgReturn, stdDev));
        const sortedReturnsAsc = [...returns].sort((a, b) => a - b);
        const sortedReturnsDesc = [...returns].sort((a, b) => b - a);
        
        function calculateBalance(returns) {
            let balance = initialDeposit;
            const yearlyData = [];
            
            for (let year = 0; year < returns.length; year++) {
                balance -= annualSpending;
                
                if (balance < 0) {
                    yearlyData.push({
                        year: year + 1,
                        returnRate: (returns[year] * 100).toFixed(2),
                        balance: 0,
                        spending: annualSpending,
                        depleted: true
                    });
                    for (let remaining = year + 1; remaining < returns.length; remaining++) {
                        yearlyData.push({
                            year: remaining + 1,
                            returnRate: 0,
                            balance: 0,
                            spending: annualSpending
                        });
                    }
                    break;
                }
                
                balance *= (1 + returns[year]);
                
                yearlyData.push({
                    year: year + 1,
                    returnRate: (returns[year] * 100).toFixed(2),
                    balance: Math.max(0, balance),
                    spending: annualSpending,
                    depleted: false
                });
            }
            return yearlyData;
        }
        
        scenarios.goodYearsFirst = calculateBalance(sortedReturnsDesc);
        scenarios.badYearsFirst = calculateBalance(sortedReturnsAsc);
        scenarios.random = calculateBalance(returns);
        const avgReturns = Array(years).fill(avgReturn / 100);
        scenarios.average = calculateBalance(avgReturns);
        
        return {
            input: { initialDeposit, monthlyContribution, annualSpendingPercent, annualSpending, monthlySpending, avgReturn, years },
            scenarios
        };
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle API requests
    if (event.path && (event.path.includes('/simulate') || event.path.endsWith('/simulate'))) {
        try {
            const body = event.body ? JSON.parse(event.body) : {};
            const { initialDeposit, monthlyContribution, spendingPercent, avgReturn, years } = body;
            
            if (!initialDeposit || !spendingPercent || !avgReturn || !years) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'All fields are required' }) };
            }
            
            const result = generateScenarios(
                parseFloat(initialDeposit),
                monthlyContribution ? parseFloat(monthlyContribution) : 0,
                parseFloat(spendingPercent),
                parseFloat(avgReturn),
                parseInt(years)
            );
            
            return { statusCode: 200, headers, body: JSON.stringify(result) };
        } catch (e) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
        }
    }

    // Handle translations
    if (event.path && (event.path.includes('/translations') || event.path.endsWith('/translations'))) {
        return { statusCode: 200, headers, body: JSON.stringify(translations) };
    }

    return { statusCode: 404, headers, body: 'Not Found' };
};
