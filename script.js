//Знаходимо елементи в HTML
const storyBox = document.querySelector('.story-box');
const choiceBtns = document.querySelector ('.choise-btn');
const sceneTitle = document.querySelector ('.scene-title');
const sceneText = document.querySelector ('.scene-text');
const powerfulValue = document.querySelector ('.power-value');
const momValue = document.querySelector ('.mom-value');
const energyValue = document.querySelector ('.energy-value');
const powerMeter = document.querySelector('power-progress');
const momvalMeter = document.querySelector ('momval-progress');
const energyMeter = document.querySelector ('energy-progress');
//Початкові характеристики Патрона (потужність, мамин спокій, енергія)
const playerState = {
    powerful: 50,
    energy: 100,
    momvalue: 100
}
let currentScene ='start';
// Сценарій гри (назва сцен, текст, вибори, ефекти)
const scenes = {
    start: {
        title: "Кінцева, виходь!",
        text: "Ти проспав зупинку в 42-й маршрутці. За вікном замість школи — червона пустеля і два місяці. Мама чекає вдома о 18:00. Час іде!",
        choices: [
            { text: "Запитати водія, де ми", next: 'driver', effect: {powerful: +10} },
            { text: "Вийти з маршрутки", next: 'exit', effect: {powerful: -5, energy: -10}  }
        ]
    },

    driver: {
        title: "Суворий водій",
        text: "Водій у скафандрі каже: 'Козаче, це Марс. Далі тільки за подвійним тарифом або пішки'.",
        choices: [
            { text: "Заплатити за проїзд назад", next: 'no_money', effect: {powerful: -20} },
            { text: "Піти пішки", next: 'exit', effect: {powerful: +10, energy: -20}}
        ]
    },

    no_money: {
        title: "Проблема з готівкою",
        text: "Водій не приймає гривні, йому треба марсіанські кристали. Він виштовхав тебе в пісок.",
        choices: [
            { text: "Шукати кристали в піску", next: 'crystals', effect: {powerful: +10,  energy: -10}},
            { text: "Плакати ", next: 'start', effect: {powerful: -30, }}
        ]
    },

    exit: {
        title: "Червона планета",
        text: "На вулиці дихати важко, але твій рюкзак перетворився на балон з киснем. Попереду блищить щось металеве.",
        choices: [
            { text: "Йти до залізяки", next: 'rover', effect: {powerful: +10, energy: -20} },
            { text: "Сховатися в печері поблизу", next: 'cave', effect: {powerful: +5}}
        ]
    },

    crystals: {
        title: "Скарби Марса",
        text: "Ти знайшов кристали! Але це виявився марсіанський цукор. Тепер за тобою біжить зграя космічних мурах.",
        choices: [
            { text: "Тікати до печери", next: 'cave', effect: {powerful: +10, energy: -15}},
            { text: "Піти в марсіанський базар", next: 'market', effect: {powerful: +20}}
        ]
    },

    rover: {
        title: "Марсохід NASA",
        text: "Це марсохід Perseverance! Він робить селфі. Якщо вкрасти його антену, можна подзвонити мамі.",
        choices: [
            { text: "Вкрасти антену", next: 'antenna', effect: {powerful: -20, energy: -10} },
            { text: "Влізти в кадр до марсохода", next: 'photobomb',  effect: {powerful: +20}}
        ]
    },

    cave: {
        title: "Таємний портал",
        text: "У печері ти знайшов старий термінал. На ньому напис: 'Введіть номер маршрутки для телепортації'.",
        choices: [
            { text: "Ввести '42'", next: 'teleport', effect: {powerful: +20} },
            { text: "Ввести '666'", next: ' wrong_bus', effect: {powerful: -20} }
        ]
    },

    antenna: {
        title: "Дзвінок мамі",
        text: "Ти підключився! Мама каже: 'Патрон, де ти? Вже 17:50!'. Ти пояснюєш про Марс, і вона обіцяє прийти за тобою з паском.",
        choices: [
            { text: "Бігти до порталу", next: 'cave', effect: {powerful: -10} },
            { text: "Піти на дивне світло", next: 'aliens', effect: {powerful: +10, momvalue: -50, energy: -10}}
        ]
    },
    aliens: {
        title: "Марсіанська вечірка",
        text: "Ти знайшла групу зелених чоловічків. Вони не злі, вони просто намагаються полагодити свій міжгалактичний тостер. Якщо допоможеш — підвезуть.",
        choices: [
            { text: "Дати їм викрутку з рюкзака", next: 'teleport', effect: {powerful: +10} },
            { text: "Запропонувати влаштувати дискотеку", next: 'dj_patron', effect: {powerful: +20, energy: -20} }
        ]
    },
    dj_patron: {
    title: "Космічна дискотека",
    text: "Прибульці не можуть полагодити тостер, бо у них заїло платівку з піснею 'Ой у лузі червона калина'. Вони просять тебе зафристайлити.",
    choices: [
        { text: "Зачитати марсіанський реп", next: 'aliens_friend', effect: {powerful: +30} },
        { text: "Сказати, що ти співаєш тільки в душі", next: 'exit', effect: {powerful: -10 }}
    ]
},

aliens_friend: {
    title: "Ти в танцях!",
    text: "Прибульці в такому захваті, що подарували тебе реактивні кеди. Тепер ти пересуваєшся зі швидкістю світла!",
    choices: [
        { text: "Вжууух до школи!", next: 'teleport', effect: {powerful: +10, momvalue: +10} },

    ]
},
    
    market: {
        title: "Космічний базар",
        text: "Мурахи відстали, і ти вийшла до марсіанського кіоску. Продавець пропонує 'космо-хот-дог' в обмін на твій щоденник.",
        choices: [
            { text: "Обміняти щоденник (все одно там двійка)", next: 'full_energy', effect: {powerful: +10, momvalue: -10}},
            { text: "Відмовитися і йти до марсохода", next: 'rover', effect: {powerful: -10}}
        ]
    },

    full_energy: {
        title: "Сила космосу",
        text: "Після хот-дога ти відчула таку силу, що можеш добігти до школи навіть без порталу! Ти встигаєш рівно о 17:59.",
        choices: [
            { text: "Перемога!", next: 'teleport', effect: {powerful: +30, momvalue: +20}}
        ]
    },
    
    wrong_bus: {
        title: "Не той маршрут",
        text: "Портал спрацював, але ти опинилася не в школі, а на Місяці. Тут тихо, але мамі звідси дзвонити ще дорожче!",
        choices: [
            { text: "Лишитися тут", next: 'moon_cheese', effect: {powerful: +10, momval: -10, energy: -5} },
            { text: "Спробувати ще раз", next: 'cave' }
        ]
    },
    moon_cheese: {
    title: "Місячна дієта",
    text: "Виявилося, що Місяць справді зроблений з сиру. Ти так захопився дегустацією, що ледь не забув про контрольну з математики!",
    choices: [
        { text: "Взяти шматочок сиру для мами і назад", next: 'cave', effect: {powerful: +20, momval: +10} }
    ]
},

    teleport: {
        title: "Вдома!",
        text: "Спалах! Ти стоїш біля своєї школи. На годиннику 17:55. Ти встиг! Але в кишені залишився червоний пісок...",
        choices: [
            { text: "Грати знову", next: 'start' }
        ]
    },
    photobomb: {
    title: "Зірка Інстаграму",
    text: "Ти зробив 'фотобомбу' на селфі Perseverance! Світлина миттєво долетіла до Землі. Тепер ти зірка, і NASA висилає за тобою персональне таксі.",
    choices: [
        { text: "Чекати на лімузин від NASA", next: 'teleport', effect: {powerful: +50, momval: +30} },
        { text: "Написати на піску 'Патрон — топ' і йти далі", next: 'cave', effect: {powerful: +50, momval: -20, energy: -20} }
    ]
},
};
// Функція для переходду між сценами
function goToScene(sceneName){
     choiceBtns.innerHTML = ' ' // Очищуємо старі кнопки
    currentScene = scenes[sceneName]; // Отримуємо дані для цени
    console.log(currentScene); // Я перевіряла чи все правильно :)
    sceneTitle.textContent = currentScene.title; // Отримуємо назву для цени
    sceneText.textContent = currentScene.text; // Отримуємо текст для цени
    // Створюємо кнопки для варіантів вибору
    currentScene.choices.forEach((choice)=>{
        const btn = document.createElement('button')
        btn.classList.add('choise-btn');
        btn.textContent = choice.text;
        // Створюємо кнопку
        btn.addEventListener('click',()=>{
            // Застосовуємо ефекти від вибору, змінюємо характеристики гравця
            if (choice.effect){
                if (typeof choice.effect.powerful === 'number'){
                  playerState.powerful += choice.effect.powerful
                  // Щоб змінювалася шкала
                  document.documentElement.style.setProperty('--power', playerState.powerful)
                  // Щоб відсотки були не більше 100
                   if (playerState.powerful > 100) playerState.powerful= 100;
                  powerfulValue.textContent = Math.round(playerState.powerful);
                }
                if (typeof choice.effect.momvalue === 'number'){
                  playerState.momvalue += choice.effect.momvalue
                  // Щоб змінювалася шкала
                  document.documentElement.style.setProperty('--momval', playerState.momvalue)
                   // Щоб відсотки були не більше 100
                   if (playerState.momvalue > 100) playerState.momvalue = 100;
                  momValue.textContent = Math.round(playerState.momvalue);
                }
                if (typeof choice.effect.energy === 'number'){
                  playerState.energy += choice.effect.energy
                  // Щоб змінювалася шкала
                   document.documentElement.style.setProperty('--energy', playerState.energy)
                    // Щоб відсотки були не більше 100
                  if (playerState.energy > 100) playerState.energy = 100;
                  energyValue.textContent = Math.round(playerState.energy);
                  // Якщо відсотки на нулі, то ви програли
                  if (playerState.energy <= 0 ||
                    playerState.momvalue <= 0 ||
                    playerState.powerful <= 0 ){
                        alert("Гра закінчена, один з твоїх показників упав до нуля. Патрон повертається на старт.")
                        // Повертаємо вхідні дані
                        playerState.energy = 100;
                        playerState.momvalue = 100;
                        playerState.powerful = 50;
                        energyValue.textContent = playerState.energy;
                        powerfulValue.textContent = playerState.powerful;
                        momValue.textContent = playerState.momvalue;
                        // І шкалу
                         document.documentElement.style.setProperty('--energy', playerState.energy);
                         document.documentElement.style.setProperty('--momval', playerState.momvalue);
                         document.documentElement.style.setProperty('--power', playerState.powerful);
                        goToScene('start');
                        return;
                    }
                }
            }
            goToScene(choice.next);
            // Якщо сцена повертає на старт, то дані повертаються на вхідні
            if (choice.next === 'start') {
            playerState.energy = 100;
            playerState.momvalue = 100;
            playerState.powerful = 50;
            energyValue.textContent = playerState.energy;
            momValue.textContent = playerState.momvalue;
            powerfulValue.textContent = playerState.powerful;
            document.documentElement.style.setProperty('--energy', playerState.energy);
            document.documentElement.style.setProperty('--momval', playerState.momvalue);
            document.documentElement.style.setProperty('--power', playerState.powerful);
}

        })
        choiceBtns.append(btn)
    })
}
document.addEventListener('DOMContentLoaded', ()=>{
    goToScene("start");
});