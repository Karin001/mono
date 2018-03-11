export enum InOut {
    in = 1,
    out = -1
}
export enum RUnit {
    R = 1,
    mR = 1e-3,
    KR = 1e3,
    MR = 1e6
}
export const Footprint = [
    'BGA', 'BQFP', 'PGA', 'CLCC', 'DFP', 'SOP', 'DIP', 'DICP', 'QFP', 'LCC', 'LGA', 'LOC', 'LQFP',
    'MCM', 'MFP', 'MQFP', 'MQUAD', 'MSP', 'OPMAC', 'PAC', 'PCLP', 'PFPF',
    'PiggyBack', 'COB', 'CSP', 'AXIAL', 'TO', 'DB9', 'SOT-223', 'TO-220T', 'TO-92', 'TO-220',
    '0201', '0402', '0603', '0805', '1206', '1210', '1812', '2225'
]
export const Runit = [
    { value: 'R', moji: '欧' },
    { value: 'mR', moji: '毫欧' },
    { value: 'KR', moji: '千欧' },
    { value: 'MR', moji: '兆欧' },

];
export const Cunit = [
    { value: 'pF', moji: '皮法' },
    { value: 'nF', moji: '钠法' },
    { value: 'uF', moji: '微法' },
    { value: 'mF', moji: '毫法' },
    { value: 'F', moji: '法' }
];
export const Wunit = [
    { value: 'W', moji: '瓦' },
    { value: 'KW', moji: '千瓦' },
    { value: 'NULL', moji: 'NULL' }
];
export enum CUnit {
    uF = 1e-6,
    pF = 1e-12,
    nf = 1e-9,
    mF = 1e-3,
    F = 1,
}
export enum WUnit {
    W = 1,
    kW = 1e3,
    null = 0
}
export const footprintType = [

]
export const Ename = [
    'RES',
    'CAP',
    'DIODE',
    'LED',
    'INDUCTOR',
    'TRIODE',
    'MOS',
    'SCR',
    'OC',
    'SW',
    'RELAY',
    'OPAMP',
    'FUSE',
    'IC',
    'MCU',
    'DSP',
    'FPGA',
    'CPLD',
    'OSCILLATOR',
]
export enum EName {
    RES = 0,
    CAP,
    DIODE,
    LED,
    INDUCTOR,
    TRIODE,
    MOS,
    SCR,
    OC,
    SW,
    RELAY,
    OPAMP,
    FUSE,
    IC,
    MCU,
    DSP,
    FPGA,
    CPLD,
    OSCILLATOR,
}
export class ModifyData {
    dir: InOut;
    date: Date;
    quantity: number;
}
export class Etype {
    name: EName;
    marking: string;
    footprint: string;
    value: string;
    power: string;
    quantity: number;
    projects: string[];
    log: ModifyData[];
    constructor(name: EName, marking: string, footprint: string, value: string, power: string, quantity: number, date: Date) {
        this.name = name;
        this.marking = marking;
        this.footprint = footprint;
        this.value = value;
        this.power = power;
        this.add(quantity, date);
    }
    add(quantity: number, date: Date) {
        this.quantity += quantity;
        this.log.push({
            dir: 1,
            date: date,
            quantity: quantity
        });
    }
    use(quantity: number, date: Date): boolean {
        if (this.quantity - quantity < 0) {
            return false;
        }
        this.quantity -= quantity;
        this.log.push({
            dir: -1,
            date: date,
            quantity: quantity
        });
        return true;
    }
    addProject(project: string) {
        this.projects.push(project);
    }

}
