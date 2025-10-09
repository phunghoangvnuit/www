    const $ = (sel) => document.querySelector(sel);
    function makeSlug(title){return (title||'').trim().toLowerCase().replace(/\s+/g,'-');}
    // let editorVI, editorEN;
    const state={coverDataUrl:''};

    // ClassicEditor.create($('#editorVI')).then(ed=>editorVI=ed);
    // ClassicEditor.create($('#editorEN')).then(ed=>editorEN=ed);

    const titleInput=$('#title');const slugInput=$('#slug');const postType=$('#postType');const category=$('#category');const tagsInput=$('#tags');
    titleInput.addEventListener('blur',()=>{if(!slugInput.value.trim())slugInput.value=makeSlug(titleInput.value);});

    const coverInput=$('#coverInput');const coverPreview=$('#coverPreview');const coverPlaceholder=$('#coverPlaceholder');
    $('#btnPick').addEventListener('click',()=>coverInput.click());
    $('#btnRemove').addEventListener('click',()=>{state.coverDataUrl='';coverPreview.style.display='none';coverPreview.src='';coverPlaceholder.style.display='block';coverInput.value='';});
    coverInput.addEventListener('change',(e)=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.coverDataUrl=String(reader.result);coverPreview.src=state.coverDataUrl;coverPreview.style.display='block';coverPlaceholder.style.display='none';};reader.readAsDataURL(file);});

    function validate(){let ok=true;if(!titleInput.value.trim()){titleInput.classList.add('is-invalid');ok=false;}else titleInput.classList.remove('is-invalid');if(!postType.value){postType.classList.add('is-invalid');ok=false;}else postType.classList.remove('is-invalid');if(!category.value){category.classList.add('is-invalid');ok=false;}else category.classList.remove('is-invalid');const vi=(editorVI&&editorVI.getData()||'').trim();const en=(editorEN&&editorEN.getData()||'').trim();$('#errVI').style.display=vi?'none':'block';$('#errEN').style.display=en?'none':'block';return{ok:ok&&!!vi&&!!en,vi,en};}

    function collectPayload(status){const {ok,vi,en}=validate();if(!ok)return null;return{title:titleInput.value.trim(),slug:slugInput.value.trim()||makeSlug(titleInput.value),postType:postType.value,category:category.value,tags:tagsInput.value.trim(),contentVI:vi,contentEN:en,coverDataUrl:state.coverDataUrl,status};}

    // function submit(status){const payload=collectPayload(status);if(!payload)return;console.log('Submitting payload:',payload);alert(status==='published'?'Đã xuất bản bài đăng (payload xem trong console).':'Đã lưu bản nháp (payload xem trong console).');}

    // ['btnSaveDraft','btnPublish','btnSaveDraft2','btnPublish2'].forEach(id=>{document.getElementById(id).addEventListener('click',()=>{submit(id.includes('Publish')?'published':'draft');});});

const {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	Alignment,
	AutoImage,
	Autoformat,
	ImageBlock,
	BlockQuote,
	Bold,
	CloudServices,
	Emoji,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	HorizontalLine,
	ImageCaption,
	ImageInsertViaUrl,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	ImageInline,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	MediaEmbed,
	Mention,
	Table,
	TableCaption,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	HtmlComment
} = window.CKEDITOR;

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjEyNjM5OTksImp0aSI6ImI0YjE3MTI0LTMwZTEtNDYxMS05MzQ1LTVmZWNkY2NjN2YzNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImZjY2M5NzMzIn0.wkWMf6mmI9mQucs8zBMcZ67GJFc4TgW0_mLffZToJFdgXbSpGHhWcLQ_4lC5DNITQNQJcxYozPGfAAzJx58JeQ';

const editorConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'emoji',
			'horizontalLine',
			'link',
			'mediaEmbed',
			'insertTable',
			'blockQuote',
			'|',
			'alignment',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'outdent',
			'indent'
		],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		Alignment,
		Autoformat,
		AutoImage,
		Autosave,
		BlockQuote,
		Bold,
		CloudServices,
		Emoji,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		Heading,
		HorizontalLine,
		HtmlComment,
		ImageBlock,
		ImageCaption,
		ImageInline,
		ImageInsertViaUrl,
		ImageStyle,
		ImageTextAlternative,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		Link,
		LinkImage,
		List,
		MediaEmbed,
		Mention,
		Paragraph,
		Table,
		TableCaption,
		TableToolbar,
		TextTransformation,
		TodoList,
		Underline
	],
	fontFamily: {
		supportAllValues: true
	},
	fontSize: {
		options: [10, 12, 14, 'default', 18, 20, 22],
		supportAllValues: true
	},
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5'
			},
			{
				model: 'heading6',
				view: 'h6',
				title: 'Heading 6',
				class: 'ck-heading_heading6'
			}
		]
	},
	htmlSupport: {
		allow: [
			{
				name: /^.*$/,
				styles: true,
				attributes: true,
				classes: true
			}
		]
	},
	image: {
		toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText']
	},
	initialData:
		' ',
	language: 'vi',
	licenseKey: LICENSE_KEY,
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file'
				}
			}
		}
	},
	mention: {
		feeds: [
			{
				marker: '@',
				feed: [
					/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
				]
			}
		]
	},
	placeholder: 'Type or paste your content here!',
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
	}
};

ClassicEditor.create(document.querySelector('#editorEN'), editorConfig);
ClassicEditor.create(document.querySelector('#editorVN'), editorConfig);
