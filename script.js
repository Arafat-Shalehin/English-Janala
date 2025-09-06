const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise to response
    .then(res => res.json()) // promise of json data
    .then(json => displayLesson(json.data));
};

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");

    lessonBtn.forEach(btn => {
        btn.classList.remove("active");
    });

};

const loadLevelWord = (id) => {

    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then (res => res.json())
    .then ((data) => {
        removeActive();

        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        
        clickBtn.classList.add("active");

        displayLevelWord(data.data)

    });
};

const createElement = (arr) => {

    const htmlEle =  arr.map((el) => 
        `<span class="btn bg-sky-300">${el}</span>`
    );

    return htmlEle.join(" ");
};

const manageSpinner = (status) => {
    if (status == true) {

        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");

    } else {

       document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadWordDetail = async (id) => {

    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    
    const res = await fetch(url);
    const detail = await res.json();
    displayWordDetails(detail.data);

};

const displayWordDetails = (word) => {
 
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = `
    <div>

        <h2 class="
        text-2xl font-bold mt-6 mb-4
        ">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>

        <p class="font-bold mb-2">Meaning</p>

        <p class="font-bangla mb-5">${word.meaning}</p>

        <p class="font-bold mb-2">Example</p>

        <p class="text-[#000000] mb-5">${word.sentence}</p>

        <h2 class="font-bangla font-semibold mb-2">সমার্থক শব্দ গুলো</h2>

        <div>
        ${createElement(word.synonyms)}
        </div>
            
    </div>

    <button class="btn btn-wide bg-blue-800 text-white rounded-xl mt-14">
        Complete Learning
    </button>
    `;
    document.getElementById("my_modal_5").showModal();

};

const displayLevelWord = (words) => {

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML =`
        <div class="text-center col-span-full rounded-xl py-10 space-y-6">

            <img class="mx-auto" src="assets/alert-error.png" alt="Error Pic">

            <p class="text-[#79716B] font-medium font-bangla mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="font-bangla md:text-4xl text-3xl font-bold">নেক্সট Lesson এ যান</h3>

        </div>
        `;
        manageSpinner(false);
        return;
    }
    
    words.forEach(word => {
        
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-[#FFFFFF] rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-3xl mb-2">
                ${word.word ? word.word : "Word can not be found"}
            </h2>
            <p class="text-sm font-semibold mb-4">
                 Meaning / Pronounciation
            </p>
            <div class="font-bangla font-medium text-2xl text-[#18181B]">
                ${word.meaning ? word.meaning : "Meaning can not be found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation can not be found"}
            </div>
            <div class="flex justify-between items-center mt-4">

                <button onclick="loadWordDetail(${word.id})" class="btn bg-sky-100 hover:bg-sky-500 rounded-xl">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                
                <button onclick="my_modal_5.showModal()" class="btn bg-sky-100 hover:bg-sky-500 rounded-xl">
                    <i class="fa-solid fa-volume-high"></i>
                </button>

            </div>
        </div>
        `

        wordContainer.append(card);

        manageSpinner(false);

    });

};

const displayLesson = (lessons) => {
    
    const levelContainer = document.getElementById("level-container");

    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        
        const btnDiv = document.createElement("div")

        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn">

        <i class="fa-solid fa-book-open"></i>
                Lesson - ${lesson.level_no}
        </button>
        `;

        levelContainer.append(btnDiv);

    }

};

loadLessons();