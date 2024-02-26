function slider(){
var headings = document.querySelectorAll('.heading-6');    
var links = document.getElementsByClassName('.peer-holder-col-1');

for (var i = 0; i < links.length; i++) {
  headings[i].addEventListener('click', function() {
  console.log(headings)
   //  Remove "active" class from all slider items and heading links
    for (var j = 0; j < links.length; j++) {
     links[j].classList.remove('show');
      headings[j].classList.remove('show');
    }

    var index = Array.prototype.indexOf.call(this.parentElement.children, this);
    links[index].classList.add('show');
    this.classList.add('show');
 });
}
}

slider()


    