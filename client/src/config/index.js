const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@. '.toLowerCase().split('').map((letter) => {
  return {
    letter: letter,
    type: 'letter'
  };
});

export const INITIAL_STATE = {
    letters: letters,
    inputs: [
        { name: 'Email',
          accepts: ['letter'],
          text: '',
          type: 'email',
          description: 'To enter email, just drag and drop letters. Simple!'
        },
        { name: 'Password',
          accepts: ['letter'],
          text: '',
          type: 'password'
        }
    ],
    sureInput:
    { name: 'Are you sure?',
          accepts: ['letter'],
          text: '',
          type: 'sure',
          description: 'yes/no'
        },
    locationInput:        
      { name: 'Location',
          accepts: ['letter'],
          text: '',
          type: 'sure',
          description: 'To prove you are a human, go to Lat: 50, Long: 14'
        },
    showSure: false,
    requirePosition: false,
    isSure: false,
    isPositionValid: false,
    superSpeed: false,
    finished: false
};

