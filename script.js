function Carousel(container, interval){
    this.IMAGE_WIDTH = 600;
    this.currentImageIndex = 0;
    this.containerDOM = container;
    this.wrapperDOM = this.containerDOM.getElementsByClassName('carousel-wrapper')[0];
    this.imageCount = this.wrapperDOM.getElementsByTagName('img').length;
    this.arrowSize = 40;
    this.indicators = [];
    var self = this;
    
    this.wrapperDOM.style.width =  this.IMAGE_WIDTH* this.imageCount + 'px';

    this.createIndicators = function(){
        var indicatorWrapper = document.createElement('div');
        indicatorWrapper.classList.add('indicator-wrapper')

        for(var i=0; i<this.imageCount; i++){
            var indicator = document.createElement('div');
            indicator.style.cursor = 'pointer';
            indicatorWrapper.appendChild(indicator);
            this.indicators.push(indicator);

            indicator.addEventListener('click', (function(i){
               return function(){
                self.slideToIndex(i);
               }
                
            })(i));
        }
        this.indicators[0].classList.add('active');
        this.containerDOM.appendChild(indicatorWrapper);

    }

    this.createLeftArrow = function(){
        var leftArrow = document.createElement('div');
        leftArrow.classList.add('arrow');
        leftArrow.innerHTML = ' <i class="fa fa-angle-left"></i> ';
        this.containerDOM.appendChild(leftArrow);
        leftArrow.style.top = '-' + this.containerDOM.offsetHeight/2 +'px';
        leftArrow.style.left = '0px';
        leftArrow.style.fontSize = this.arrowSize + 'px';
        leftArrow.style.cursor = 'pointer';

        leftArrow.addEventListener('click', function(){
            
            var index = self.currentImageIndex - 1;

            if(index < 0){
                index = self.imageCount-1;
            }            

            self.slideToIndex(index);
        
        });
    }

    this.createRightArrow = function(){
        var rightArrow = document.createElement('div');
        rightArrow.classList.add('arrow');
        rightArrow.innerHTML = ' <i class="fa fa-angle-right"></i> ';
        this.containerDOM.appendChild(rightArrow);
        rightArrow.style.fontSize = this.arrowSize+'px';
        rightArrow.style.left = (this.containerDOM.offsetWidth - this.arrowSize)+'px';
        rightArrow.style.top = '-'+ this.containerDOM.offsetHeight/2 +'px';
        rightArrow.style.cursor = 'pointer';

        rightArrow.addEventListener('click', function(){
            
            var index = self.currentImageIndex + 1;

            if(index >= self.imageCount){
                index = 0;
            }            

            self.slideToIndex(index);
        
        });
    }

    this.slideToIndex = function(index){
        clearInterval(this.a);
        this.currentImageIndex = index;
        this.wrapperDOM.style.marginLeft = - this.currentImageIndex * this.IMAGE_WIDTH + 'px';
        this.toogleIndicators();
        this.a = setInterval(this.slide.bind(this), interval);

    }
    
    this.toogleIndicators = function(){
        for(var i=0; i<this.indicators.length; i++){
            this.indicators[i].classList.remove('active');
        }
        this.indicators[this.currentImageIndex].classList.add('active');
    }

    this.slide = function(){
    this.currentImageIndex++;

    if(this.currentImageIndex >= this.imageCount){
        this.currentImageIndex = 0;
    }
    this.toogleIndicators();
    this.wrapperDOM.style.marginLeft = - this.currentImageIndex * this.IMAGE_WIDTH + 'px';
    this.wrapperDOM.style.transition = '1s ease';
    }

    this.init = function(){
        this.createIndicators();
        this.createLeftArrow();
        this.createRightArrow();
        this.a = setInterval(this.slide.bind(this),interval);
    }

    this.init();

}

(function(){
            document.getElementsByTagName('body')[0].onload = function(){
            var carousels = document.getElementsByClassName('carousel-container');
        
            for(var i=0; i<carousels.length;i++){
            new Carousel(carousels[i], 2000);
          }
        }
    })();
    
    