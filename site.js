(function(){
  var nav=document.querySelector('.nav');
  var burger=document.querySelector('.burger');
  if(burger){burger.addEventListener('click',function(){nav.classList.toggle('open');burger.setAttribute('aria-expanded',nav.classList.contains('open'));});}
  function onScroll(){if(nav)nav.classList.toggle('scrolled',window.scrollY>30);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // highlight current page
  var here=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.links a').forEach(function(a){if(a.getAttribute('href').toLowerCase()===here && !a.classList.contains('cta'))a.classList.add('active');});

  // reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('in');});}

  // lightbox
  var lb=document.querySelector('.lightbox');
  if(lb){
    var lbImg=lb.querySelector('img');
    document.querySelectorAll('.gallery figure').forEach(function(f){
      f.addEventListener('click',function(){var i=f.querySelector('img');lbImg.src=i.src;lbImg.alt=i.alt;lb.classList.add('on');});
    });
    lb.addEventListener('click',function(){lb.classList.remove('on');});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on');});
  }

  // quote form -> text message to Angel (falls back to email app on desktop)
  var form=document.getElementById('quote-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form);
      var msg='FREE QUOTE REQUEST (website)\n'+
        'Name: '+d.get('name')+'\n'+
        'Phone: '+d.get('phone')+'\n'+
        (d.get('email')?'Email: '+d.get('email')+'\n':'')+
        'Project: '+d.get('service')+'\n'+
        (d.get('address')?'Address: '+d.get('address')+'\n':'')+
        'Details: '+d.get('details');
      var mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if(mobile){
        var sep=/iPhone|iPad|iPod/i.test(navigator.userAgent)?'&':'?';
        location.href='sms:+12083299403'+sep+'body='+encodeURIComponent(msg);
      }else{
        var out=document.getElementById('quote-out');
        out.hidden=false;
        out.querySelector('pre').textContent=msg;
        out.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
  }
})();
