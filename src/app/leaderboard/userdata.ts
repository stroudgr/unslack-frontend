import { User } from './user.model';
// import { slacker } from './slacker';

/*export const DATA: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    //username: Bret,
    score: 100,
    info: ''
  },
  {
    id: 2,
    name: "Ervin Howell",
    //username: Antonette,
    score: 99,
    info: 'Hi'
  },
  {
    id: 3,
    name: "Clementine Bauch",
    //username: Samantha,
    score: 90,
    info: 'bye'
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    //username: Karianne,
    score: 88,
    info: 'Julianne.OConner@kory.org'
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    //username: Kamren,
    score: 80,
    info: ''
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    //username: Leopoldo_Corkery,
    score: 71,
    info: ''
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    //username: Elwyn.Skiles,
    score: 60,
    info: 'se7en'
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    //username: Maxime_Nienow,
    score: 50,
    info: ''
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    //username: Delphine,
    score: 41,
    info: ''
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    //username: Moriah.Stanton,
    score: 0,
    info: ':('
  }
];*/


/*
export const DATA: User[] = [
  {
    rank: 1,
    slacker: {
      id: 0,
      name: "Leanne Graham",
      score: 100
    }
  },
  {
    rank: 2,
    slacker: {
      id: 1,
      name: "Ervin Howell",
      score: 99
    }
  },
  {
    rank: 3,
    slacker: {
      id: 2,
      name: "Clementine Bauch",
      score: 90
    }
  },
  {
    rank: 4,
    slacker: {
      id: 3,
      name: "Patricia Lebsack",
      score: 88
    }
  },
  {
    rank: 5,
    slacker: {
      id: 4,
      name: "Chelsey Dietrich",
      score: 80
    }
  },
  {
    rank: 6,
    slacker: {
      id: 5,
      name: "Mrs. Dennis Schulist",
      score: 71
    }
  },
  {
    rank: 7,
    slacker: {
      id: 0,
      name: "Kurtis Weissnat",
      score: 60
    }
  },
  {
    rank: 8,
    slacker: {
      id: 0,
      name: "Nicholas Runolfsdottir V",
      score: 50
    }
  },
  {
    rank: 9,
    slacker: {
      id: 0,
      name: "Glenna Reichert",
      score: 41
    }
  },
  {
    rank: 10,
    slacker: {
      id: 0,
      name: "Clementina DuBuque",
      score: 0
    }
  }
]
*/

/*NOTE*/
/*export const DATA2: User[] = [
  {
    id: 1,
    name: 'Graeme Stroud',
    //username: Bret,
    score: 100,
    info: ''
  },
  {
    id: 2,
    name: 'Kevin Chan',
    //username: Antonette,
    score: 99,
    info: 'Hi'
  },
  {
    id: 3,
    name: 'Alana Man',
    //username: Samantha,
    score: 90,
    info: 'bye'
  },
  {
    id: 4,
    name: 'David Colloard',
    //username: Karianne,
    score: 88,
    info: 'Julianne.OConner@kory.org'
  },
  {
    id: 5,
    name: 'Stephen Koza',
    //username: Kamren,
    score: 80,
    info: ''
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    // username: Leopoldo_Corkery,
    score: 71,
    info: ''
  },
  {
    id: 7,
    name: 'Phillip Wang',
    // username: Elwyn.Skiles,
    score: 60,
    info: 'se7en'
  },
  {
    id: 8,
    name: 'Omid Raj',
    // username: Maxime_Nienow,
    score: 50,
    info: ''
  }
];*/
/**/

/*
export const DATA2: User[] = [
  {
    rank: 1,
    slacker: {
      id: 1,
      name: "Graeme Stroud",
      score: 100
    }
  },
  {
    rank: 2,
    slacker: {
      id: 2,
      name: "Kevin Chan",
      score: 99
    }
  },
  {
    rank: 2,
    slacker: {
      id: 3,
      name: "Alana Man",
      score: 90
    }
  },
  {
    rank: 4,
    slacker: {
      id: 4,
      name: "David Colloard",
      score: 88
    }
  },
  {
    rank: 5,
    slacker: {
      id: 5,
      name: "Stephen Koza",
      score: 80
    }
  },
  {
    rank: 2,
    slacker: {
      id: 6,
      name: "Mrs. Dennis Schulist",
      score: 71
    }
  },
  {
    rank: 2,
    slacker: {
      id: 7,
      name: "Phillip Wang",
      score: 60
    }
  },
  {
    rank: 2,
    slacker: {
      id: 8,
      name: "Omid Raj",
      score: 50
    }
  }
]


export const DATA: User[] = [
  {
    rank: 1,
    name: 'Leanne Graham',
    score: 100
  },
  {
    rank: 2,
    name: 'Richard Waterbottle',
    score: 64
  },
  {
    rank: 3,
    name: 'Tanya Whistler',
    score: 24
  }
];

export const DATA2: User[] = [
  {
    rank: 1,
    name: 'Susan Boyle',
    score: 100
  },
  {
    rank: 2,
    name: 'Ariana MediumSize',
    score: 98
  },
  {
    rank: 3,
    name: 'WhatAreThoseee',
    score: 34
  },
  {
    rank: 4,
    name: 'Daniel Darrington',
    score: 21
  }
];

export const ALLBOARDS: User [][] = [DATA, DATA2, DATA, DATA2, DATA, DATA2, DATA, DATA2, DATA, DATA2, DATA, DATA2];
*/
