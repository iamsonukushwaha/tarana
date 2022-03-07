const shareBtn = document.querySelector('.share-btn');
const shareOptions = document.querySelector('.share-optns');
shareBtn.addEventListener('click',() =>{
    shareOptions.classList.toggle('active');
});