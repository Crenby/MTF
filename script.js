"use strict";

window.addEventListener("DOMContentLoaded", () => {
    //Price
    const menuPrice = document.querySelector(".menu_price");
    const minPrice = document.querySelector(".menu_price_min");

    class priceCard {
        constructor(product, imgURL, productPrice) {
            this.product = product;
            this.imgURL = imgURL;
            this.productPrice = productPrice;
        };

        render() {
            const element = document.createElement("div");
            element.classList.add("menu_price_card");
            element.innerHTML = `
                <div class="price_card_name"> 
                    <span> ${this.product} </span> 
                    <div class="price_card_image"> 
                        <img src="${this.imgURL}">
                    </div>
                    <div class="price_card_price"> <span> От ${this.productPrice} руб. <span> </div>
                    <div data-modal class="price_card_btn"> <span>Заказать</span> </div>
                </div>
            `;

            menuPrice.insertBefore(element, minPrice);
        };
    };
    
    new priceCard("Диван угловой", "./image/Cards_photo/card1_corner sofa.png", 3000).render();
    new priceCard("Диван прямой", "./image/Cards_photo/card2_sofa straight.png", 2500).render();
    new priceCard("Диван П-образный", "./image/Cards_photo/card3_u-shaped sofa.png", 3500).render();
    new priceCard("Матрасы", "./image/Cards_photo/card4_mattress.png", 1700).render();
    new priceCard("Кресло", "./image/Cards_photo/card5_armchair.png", 1000).render();
    new priceCard("Пуф", "./image/Cards_photo/card6_ottoman.png", 500).render();

    const cardsMessage = [
        "Здравствуйте%20хочу%20заказать%20чистку%20углового%20дивана." ,
        "Здравствуйте%20хочу%20заказать%20чистку%20прямого%20дивана.",
        "Здравствуйте%20хочу%20заказать%20чистку%20п-образного дивана.",
        "Здравствуйте%20хочу%20заказать%20чистку%20матраса.",
        "Здравствуйте%20хочу%20заказать%20чистку%20кресла.",
        "Здравствуйте%20хочу%20заказать%20чистку%20пуфа.",
    ];

    //Slider

    let offset = 0;
    let slideIndex = 1;

    const prev = document.querySelector('.work_control_prev'),
          next = document.querySelector('.work_control_next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.example_work_slide_wrapper'),
          width = window.getComputedStyle(slidesWrapper).width,
          slidesField = document.querySelector('.expample_work_slide_inner');
        
    class exampleWorks {
        constructor(imgURL) {
            this.imgURL = imgURL;
        };
        
        render() {
            const element = document.createElement("div");

            element.classList.add("example_work_slide");
            element.innerHTML = `<img src="${this.imgURL}">`;

            slidesField.append(element);
        };
    };

    new exampleWorks("image/Examples/1.jpg").render();
    new exampleWorks("image/Examples/2.jpg").render();
    new exampleWorks("image/Examples/3.jpg").render();
    new exampleWorks("image/Examples/4.jpg").render();
    new exampleWorks("image/Examples/5.jpg").render();

    const slides = document.querySelectorAll('.example_work_slide');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    };
    
    slidesField.style.width = 100 * slides.length + '%';

    function changeSlideCurrent () {
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        };
    };

    function nextSlider () {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        };

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        };
    };

    function prevSlider() {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        };
    
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        };
    };

    next.addEventListener('click', () => {
        nextSlider();
        changeSlideCurrent(); 
    });

    prev.addEventListener('click', () => {
        prevSlider();
        changeSlideCurrent();
    });

    let pos1 = 0;
    let pos2 = 0;

    slidesWrapper.addEventListener("touchstart", (e) => {
        pos1 = e.touches[0].clientX;
    });

    slidesWrapper.addEventListener("touchend", (e) => {
        pos2 = e.changedTouches[0].pageX;

        if (Math.abs(pos1 - pos2) > 40 && pos1 > pos2) {
            nextSlider();
            changeSlideCurrent();
        } else if (Math.abs(pos1 - pos2) > 40 && pos2 > pos1) {
            prevSlider();
            changeSlideCurrent();
        };
    });

    // Logo anim

    const logoText = document.querySelector(".main_logo_image");

    document.addEventListener("scroll", () => {
        if(window.pageYOffset > 280) {
            logoText.classList.remove("hide");
        } else {
            logoText.classList.add("hide");
        };
    });

    //Modal

    const modalTrigger = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    const priceCards = document.querySelectorAll(".menu_price_card");
    const modalInner = document.querySelector(".modal_content");

    priceCards.forEach((card, i) => {
        card.addEventListener("click", () => {
            modalInner.innerHTML = `
                <div data-close class="modal_close"> &times; </div>
                <div class="end_logo_m">
                    <div class="end_logo_text_m"> <span> Звоните, мы всегда ответим </span> </div>
                    <div class="end_logo_phone_m"> 
                        <a href="tel:+79960378252"> 
                            <span> +7-996-037-82-52 </span> 
                        </a> 
                    </div>
                    <div onclick="location.href='https://wa.me/79960378252?text=${cardsMessage[i]}';" class="end_logo_whats_m">
                        <span> Написать в WhatsApp </span>
                        <img src="./image/whatsapp.png">
                    </div>
        
                    <div onclick="location.href='https://t.me/klyaksa42';" class="end_logo_telegram_m">
                        <span> Написать в Telegram </span>
                        <img src="./image/telegram.png">
                    </div>
                </div>
            `;
        });
    });
    
    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
    };

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    }); 
    
    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    };

    modal.addEventListener("click", (e) => {
        if(e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    //MainMenu

    const mainMenuBtn = document.querySelector(".main_menu");
    const mainMenu = document.querySelector(".main_menu_launcher");
    const mainMenuTitle = document.querySelectorAll(".menu_launcher_title");
    const slidesScroll =document.querySelector(".example_work");
    const mainMenuLauncher = document.querySelector(".main_menu_launcher");
    const main = document.querySelector(".main");
    const medianWrapper = document.querySelector(".median");

    mainMenuBtn.addEventListener("click", () => {
        mainMenuLauncher.style.right = `${main.getBoundingClientRect().left}px`;
        mainMenu.classList.toggle("hide");
    });

    document.addEventListener("click", (e) => {
        if(e.target != mainMenuBtn) {
            mainMenu.classList.add("hide");
        };
    });

    mainMenuTitle[0].addEventListener("click", () => {
        menuPrice.scrollIntoView({
            block: "start",
            behavior: "smooth",
        }); 
    });

    mainMenuTitle[1].addEventListener("click", () => {
        slidesScroll.scrollIntoView({
            block: "start",
            behavior: "smooth",
        }); 
    });

    mainMenuTitle[2].addEventListener("click", () => {
        medianWrapper.scrollIntoView({
            block: "start",
            behavior: "smooth",
        }); 
    });

});