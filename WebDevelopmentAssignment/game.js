const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a forest and see an apple laying under a tree.',
        options: [
            {
                text: 'Take apple',
                setState: {apple: true},
                nextText: 2
            },
            {
                text: 'Leave it',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'There was a path leading off into the distance. Following it, you came across a merchant’s cart, covered in a large satin cloth.',
        options: [
            {
                text: 'Trade the apple for a sword',
                requiredState: (currentState) => currentState.apple,
                setState: { apple: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the apple for a shield',
                requiredState: (currentState) => currentState.apple,
                setState: { apple: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 12
            }
        ]
    },
    {
        id: 3,
        text: 'After trading with the merchant, crying. He told me, “My daughter has gone missing. I am desperate to find her.”',
        options: [
            {
                text: 'I will find your daughter.',
                nextText: 4
            },
            {
                text: 'Thats not my problem',
                nextText: 9
            }
        ]
    },
    {
        id: 4,
        text: 'The merchant tells you to be careful as you search for his daughter because there is a monster in the forest. Afterwards, you went off into the forest to find the merchants daughter.',
        options: [
            {
                text: 'Search around for the merchants daughter.',
                nextText: 5
            },
            {
                text: 'Take a rest against a tree.',
                nextText: 10
            },
            
        ]

    },
    {
        id: 5,
        text: 'Looking through bushes you hear a woman scream!',
        options: [
            {
                text: 'Run toward the scream',
                nextText: 6
            },
            {
                text: 'Run away from the scream',
                nextText: 11
            },
        ]

    },
    {
        id: 6,
        text: 'You arrive at the scence and you see a large monster about to attack the merchants daughter',
        options: [
            {
                text: 'Use your sword to attack the monster.',
                requiredState: (currentState) => currentState.sword,
                nextText: 7
            },
            {
                text: 'Use your Shield to defend the merchants daughter.',
                requiredState: (currentState) => currentState.shield,
                nextText: 8
            },
            {
                text: 'Run away.',
                nextText: 11
            }
        ]
    },
    {
        id: 7,
        text: 'You quickly catch the monster off guard slashing its throat it dies. The merchants daughter thanks you',
        options: [
            {
                text: 'Return the merchants daughter to her father.',
                nextText: 13
            }
        ]
        
    },
    {
        id: 8,
        text: 'You jump infront of the monsters attack bracing yourself you take the full force of the attack with your shield and parry the monsters attack it falls backward htting its head on a rock dying in the process. The merchants daughter a bit confused thanks you anyways',
        options: [
            {
                text: 'Retutn the merchants daughter to her father.',
                nextText: 13
            }
        ]

    },
    {
        id: 9,
        text: 'You walk away from the merchant deeper into the forest you are caught off guard by a vicious monster and killed',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'While sleeping you drop your guard completly the monster sneaks up on you and eats you.',
        options: [
            {
                text: 'restart',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'Running away your fear blinds you while aimlessly running you manage to fall of a cliff to your death',
        options: [
            {
                text: 'restart',
                nextText: -1
            }
        ]
    },
    {
        id: 12,
        text: 'You wander the forest endlessly eventually succumbing to hunger you passout in the forest and are eaten by a monster',
        options: [
            {
                text: 'restart',
                nextText: -1

            }
        ]
    },
    {
        id: 13,
        text: 'You returned the merchants daughter to him he rewards you with 100 gold coins. You Win.',
        options: [
            {
                text: 'restart',
                nextText: -1
            }
        ]
    }

]

startGame()