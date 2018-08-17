const deban = [
	{
		A: [11, 14, 15, 18, 21, 24, 27, 30, 33, 36],
		B: [12, 16, 18, 22, 26, 30, 34, 38, 42, 46],
		C: [12, 17, 20, 25, 30, 35, 40, 45, 50, 55],
		D: [10, 12, 13, 14 ,15, 16, 17, 18, 19, 20],
		E: [12, 16, 19, 22, 25, 28, 31, 34, 37, 40],
		F: [14, 19, 23, 27, 31, 35, 39, 43, 47, 51],
		G: [15, 20, 24, 28, 32, 36, 40, 44, 48, 52],
		H: [21, 38, 55, 72, 89, 106, 123, 140, 157, 174],
		I: [17, 22, 27, 32, 37, 42, 47, 52, 57, 62]
	},
	{
		A: 1.25,
		B: 1.75,
		C: 2,
		D: 2.25,
		E: 2.5,
		F: 5
	}
]

const zhongtong = {
	A: 0.5,
	B: 0.75,
	C: 1,
	D: 1.5
}
const shunfeng = [
	{
		A: 24,
		B: 53,
		C: 56,
		D: 69,
		E: 73,
		F: 74,
		// G: 84,
		H: 90,
		I: 273,
		// J: 273
	},
	{
		A: 0.7,
		B: 1.2,
		C: 1.4,
		D: 1.6,
		E: 1.7,
		F: 1.5,
		// G: 1.7,
		H: 1.6,
		I: 4.2,
		// J: 4.3
	}
]
const youzhen = {
	A: 1.25,
	B: 1.5,
	C: 2,
	D: 2.5,
	E: 4.5
}

export const Arr = [
	{
		value:1,
		label:"北京市",
		deban1: deban[0].A,
		deban2: deban[1].A,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].B,
		shunfeng2: shunfeng[1].B,
		youzhen: youzhen.B
	},
	{
		value:2,
		label:"天津市",
		deban1: deban[0].A,
		deban2: deban[1].A,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].B,
		shunfeng2: shunfeng[1].B,
		youzhen: youzhen.B
	},
	{
		value:3,
		label:"河北省",
		deban1: deban[0].A,
		deban2: deban[1].B,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].B,
		shunfeng2: shunfeng[1].B,
		youzhen: youzhen.B
	},
	{
		value:4,
		label:"山西省",
		deban1: deban[0].A,
		deban2: deban[1].B,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].B,
		shunfeng2: shunfeng[1].B,
		youzhen: youzhen.C
	},
	{
		value:5,
		label:"内蒙古自治区",
		deban1: deban[0].G,
		deban2: deban[1].D,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].F,
		shunfeng2: shunfeng[1].F,
		youzhen: youzhen.C
	},
	{
		value:6,
		label:"辽宁省",
		deban1: deban[0].D,
		deban2: deban[1].A,
		zhongtong: zhongtong.B,
		shunfeng1: shunfeng[0].A,
		shunfeng2: shunfeng[1].A,
		youzhen: youzhen.A
	},
	{
		value:7,
		label:"吉林省",
		deban1: deban[0].A,
		deban2: deban[1].A,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].B,
		shunfeng2: shunfeng[1].B,
		youzhen: youzhen.A
	},
	{
		value:8,
		label:"黑龙江省",
		deban1: deban[0].A,
		deban2: deban[1].A,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].B,
		shunfeng2: shunfeng[1].B,
		youzhen: youzhen.A
	},
	{
		value:9,
		label:"上海市",
		deban1: deban[0].B,
		deban2: deban[1].B,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.C
	},
	{
		value:10,
		label:"江苏省",
		deban1: deban[0].B,
		deban2: deban[1].B,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.C
	},
	{
		value:11,
		label:"浙江省",
		deban1: deban[0].B,
		deban2: deban[1].B,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.C
	},
	{
		value:12,
		label:"安徽省",
		deban1: deban[0].B,
		deban2: deban[1].B,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.C
	},
	{
		value:13,
		label:"福建省",
		deban1: deban[0].B,
		deban2: deban[1].C,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.D
	},
	{
		value:14,
		label:"江西省",
		deban1: deban[0].B,
		deban2: deban[1].C,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.D
	},
	{
		value:15,
		label:"山东省",
		deban1: deban[0].A,
		deban2: deban[1].B,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].B,
		shunfeng2: shunfeng[1].B,
		youzhen: youzhen.B
	},
	{
		value:16,
		label:"河南省",
		deban1: deban[0].E,
		deban2: deban[1].C,
		zhongtong: zhongtong.C,
		shunfeng1: shunfeng[0].C,
		shunfeng2: shunfeng[1].C,
		youzhen: youzhen.C
	},
	{
		value:17,
		label:"湖北省",
		deban1: deban[0].B,
		deban2: deban[1].B,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.C
	},
	{
		value:18,
		label:"湖南省",
		deban1: deban[0].B,
		deban2: deban[1].B,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.D
	},
	{
		value:19,
		label:"广东省",
		deban1: deban[0].C,
		deban2: deban[1].C,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.D
	},
	{
		value:20,
		label:"广西壮族自治区",
		deban1: deban[0].F,
		deban2: deban[1].D,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].E,
		shunfeng2: shunfeng[1].E,
		youzhen: youzhen.D
	},
	{
		value:21,
		label:"海南省",
		deban1: deban[0].F,
		deban2: deban[1].D,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].E,
		shunfeng2: shunfeng[1].E,
		youzhen: youzhen.E
	},
	{
		value:22,
		label:"重庆市",
		deban1: deban[0].B,
		deban2: deban[1].C,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.D
	},
	{
		value:23,
		label:"四川省",
		deban1: deban[0].B,
		deban2: deban[1].C,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.D
	},
	{
		value:24,
		label:"贵州省",
		deban1: deban[0].F,
		deban2: deban[1].D,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].E,
		shunfeng2: shunfeng[1].E,
		youzhen: youzhen.D
	},
	{
		value:25,
		label:"云南省",
		deban1: deban[0].G,
		deban2: deban[1].D,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].F,
		shunfeng2: shunfeng[1].F,
		youzhen: youzhen.E
	},
	{
		value:26,
		label:"西藏自治区",
		deban1: deban[0].H,
		deban2: deban[1].F,
		zhongtong: null,
		shunfeng1: null,
		shunfeng2: null,
		youzhen: youzhen.E
	},
	{
		value:27,
		label:"陕西省",
		deban1: deban[0].B,
		deban2: deban[1].C,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].D,
		shunfeng2: shunfeng[1].D,
		youzhen: youzhen.C
	},
	{
		value:28,
		label:"甘肃省",
		deban1: deban[0].G,
		deban2: deban[1].E,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].F,
		shunfeng2: shunfeng[1].F,
		youzhen: youzhen.D
	},
	{
		value:29,
		label:"青海省",
		deban1: deban[0].G,
		deban2: deban[1].E,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].F,
		shunfeng2: shunfeng[1].F,
		youzhen: youzhen.D
	},
	{
		value:30,
		label:"宁夏回族自治区",
		deban1: deban[0].G,
		deban2: deban[1].E,
		zhongtong: zhongtong.D,
		shunfeng1: shunfeng[0].F,
		shunfeng2: shunfeng[1].F,
		youzhen: youzhen.D
	},
	{
		value:31,
		label:"新疆维吾尔自治区",
		deban1: deban[0].H,
		deban2: deban[1].F,
		zhongtong: null,
		shunfeng1: shunfeng[0].I,
		shunfeng2: shunfeng[1].I,
		youzhen: youzhen.E
	}
]





