    document.querySelectorAll('.btn-delete').forEach(btn=>{
      btn.addEventListener('click',()=>{ if(confirm('Delete this post?')) alert('Deleted (demo)'); });
    });