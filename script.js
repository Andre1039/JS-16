class Slider {
    constructor(obj) {
        this.slider = document.querySelector(obj.slider);
        this.sliderLine = this.slider.querySelector(obj.sliderLine);
        this.slides = this.sliderLine.children;
        this.next = this.slider.querySelector(obj.next);
        this.prev = this.slider.querySelector(obj.prev);

        this.width = this.slider.clientWidth;
        this.height = this.slider.clientHeight;
        this.dir = obj.direction.toUpperCase() == 'X' ? 'X' : 'Y';
        this.moveSize = 'X' === this.dir ? this.width : this.height;

        this.activeSlide = 0;

        this.sliderLine.style = `
            position: relative;
            height: ${this.height}px;
            overflow: hidden; 
        `;

        for(let  i = 0; i < this.slides.length; i++) {
            this.slides[i].style = `
                position: absolute;
                width: ${this.width}px;
                height: ${this.height}px;
            `

            if(i != this.activeSlide) {
                this.slides[i].style.transform = `translate${this.dir}(${this.moveSize}px)`;
            }

            if(i === this.slides.length) {
                this.slides[i].style.transform = `translate${this.dir}(${-this.moveSize}px)`;
            }
        }

        this.next.addEventListener('click', () => this.move(this.next));
        this.prev.addEventListener('click', () => this.move(this.prev));
    }

    move(btn) {

        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize;
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.transition = '0ms';
            if (i != this.activeSlide) {
                this.slides[i].style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`;
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
        this.slides[this.activeSlide].style.transition = '1000ms';

        if (btn == this.next) {
            this.activeSlide++;
            if (this.activeSlide >= this.slides.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--;
            if(this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1;
            }
        }

        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
        this.slides[this.activeSlide].style.transition = '1000ms';

        this.setAttribute(this.next, this.prev);
        

    }

    setAttribute(el1, el2) {
        el1.setAttribute('disabled', '');
        el2.setAttribute('disabled', '');

        setTimeout(() => this.removeAttribute(this.next, this.prev), 1000);
    }

    removeAttribute(el1, el2) {
        el1.removeAttribute('disabled', '');
        el2.removeAttribute('disabled', '');
    }
}


// let arr = ['apple','bannana','plum']

// arr.forEach((slide, i) => {
//     console.log(i);
// })

// for(let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

const slider = new Slider({
    slider: '.slider',
    sliderLine: '.slider__line',
    next: '.slider__next',
    prev: '.slider__prev',
    direction: 'X'
})


// let obj = {
//     slider: '.slider'
// }

// console.log(obj.slider);


// let btn1 = document.querySelector('.slider__prev');
// let btn2 = document.querySelector('.slider__next');

// btn1.removeAttribute('disabled', '');
// btn2.removeAttribute('disabled', '');
