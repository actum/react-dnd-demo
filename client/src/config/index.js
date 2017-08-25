export const INITIAL_STATE = {
    content: [
        { name: 'JavaScript',
          icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2000px-Unofficial_JavaScript_logo_2.svg.png',
          type: 'language'
        },
        { name: 'C#',
          icon: 'https://www.codesai.com/assets/csharp_logo.svg',
          type: 'language'
        },
        { name: 'Kitten',
          icon: 'http://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-69-57b32c431e8a7__605.jpg',
          type: 'animal'
        },
        { name: 'Php',
          icon: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg',
          type: 'language'
        },
        { name: 'Terminator',
          icon: 'https://www.movieposter.com/posters/archive/main/230/MPW-115179',
          type: 'movie'
        },
        { name: 'Jar Jar Binks',
          icon: 'https://media.giphy.com/media/olnuKV0a3Et5C/giphy.gif',
          type: 'idiot'
        },
        { name: 'Babel',
          icon: 'https://cdn.worldvectorlogo.com/logos/babel-10.svg',
          type: 'transpiler'
        },
        { name: 'Pickle Rick',
          icon: 'picklerick.jpg',
          type: 'pickle'
        },
        { name: 'Darth Vader',
          icon: 'http://media0.giphy.com/media/KYRWe7ZhXcck8/giphy.gif',
          type: 'sith'
        }
    ],
    bins: [
        { name: 'Bin 1',
          accepts: ['language', 'movie']
        },
        { name: 'Bin 2',
          accepts: ['language']
        },
        { name: 'Bin 3',
          accepts: ['animal', 'idiot']
        }
    ]
};

