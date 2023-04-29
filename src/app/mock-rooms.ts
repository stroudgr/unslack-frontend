import { Room } from './room';

export const ROOMS: Room[] = [
  { id: 1, name: 'HPS200',
    member_ids: [11, 12, 13],
    blacklist: ['https://facebook.com'],
    scores: [20, 30]},
  { id: 2, name: 'CSC301',
    member_ids: [11, 12],
    blacklist: ['https://facebook.com'],
    scores: [20, 30] },
  { id: 3, name: 'CSC343',
    member_ids: [11, 12, 34],
    blacklist: ['https://facebook.com'],
    scores: [20, 30] }
];
