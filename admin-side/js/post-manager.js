    const $ = (sel) => document.querySelector(sel);
    function makeSlug(title){return (title||'').trim().toLowerCase().replace(/\s+/g,'-');}
    let editorVI, editorEN;
    const state={coverDataUrl:''};

    ClassicEditor.create($('#editorVI')).then(ed=>editorVI=ed);
    ClassicEditor.create($('#editorEN')).then(ed=>editorEN=ed);

    const titleInput=$('#title');const slugInput=$('#slug');const postType=$('#postType');const category=$('#category');const tagsInput=$('#tags');
    titleInput.addEventListener('blur',()=>{if(!slugInput.value.trim())slugInput.value=makeSlug(titleInput.value);});

    const coverInput=$('#coverInput');const coverPreview=$('#coverPreview');const coverPlaceholder=$('#coverPlaceholder');
    $('#btnPick').addEventListener('click',()=>coverInput.click());
    $('#btnRemove').addEventListener('click',()=>{state.coverDataUrl='';coverPreview.style.display='none';coverPreview.src='';coverPlaceholder.style.display='block';coverInput.value='';});
    coverInput.addEventListener('change',(e)=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.coverDataUrl=String(reader.result);coverPreview.src=state.coverDataUrl;coverPreview.style.display='block';coverPlaceholder.style.display='none';};reader.readAsDataURL(file);});

    function validate(){let ok=true;if(!titleInput.value.trim()){titleInput.classList.add('is-invalid');ok=false;}else titleInput.classList.remove('is-invalid');if(!postType.value){postType.classList.add('is-invalid');ok=false;}else postType.classList.remove('is-invalid');if(!category.value){category.classList.add('is-invalid');ok=false;}else category.classList.remove('is-invalid');const vi=(editorVI&&editorVI.getData()||'').trim();const en=(editorEN&&editorEN.getData()||'').trim();$('#errVI').style.display=vi?'none':'block';$('#errEN').style.display=en?'none':'block';return{ok:ok&&!!vi&&!!en,vi,en};}

    function collectPayload(status){const {ok,vi,en}=validate();if(!ok)return null;return{title:titleInput.value.trim(),slug:slugInput.value.trim()||makeSlug(titleInput.value),postType:postType.value,category:category.value,tags:tagsInput.value.trim(),contentVI:vi,contentEN:en,coverDataUrl:state.coverDataUrl,status};}

    function submit(status){const payload=collectPayload(status);if(!payload)return;console.log('Submitting payload:',payload);alert(status==='published'?'Đã xuất bản bài đăng (payload xem trong console).':'Đã lưu bản nháp (payload xem trong console).');}

    ['btnSaveDraft','btnPublish','btnSaveDraft2','btnPublish2'].forEach(id=>{document.getElementById(id).addEventListener('click',()=>{submit(id.includes('Publish')?'published':'draft');});});