
// NOTE: This is just a slacker, but with a rank instead of a score.
// I still have to figure out searching with slackers so I will keep this
// class for now, but delete it once I figure slackers out.
// - Graeme
import { Slacker } from '../slacker';

export interface User {
    // rank: number;
    name: string;
    dailyScore: number;
    weeklyScore: number;
    monthlyScore: number;
}

/*export interface User {
    rank: number;
    slacker: Slacker
}*/
