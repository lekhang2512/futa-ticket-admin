<template>
  <div>
    <tiny-mce
      v-model="content"
      :id='id'
      :init="init()"
      :toolbar="toolbar"
      :plugins="plugins"
      :key="reRender"
    />
  </div>
</template>

<script>
  import TinyMce from '@tinymce/tinymce-vue'
  import moment from 'moment'

  import 'tinymce/tinymce'

  import 'tinymce/themes/modern/theme'

  import 'tinymce/plugins/template'
  // import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/wordcount'

  import 'tinymce/skins/lightgray/content.min.css'
  import 'tinymce/skins/lightgray/skin.min.css'
  import {mapActions} from 'vuex'

  export default {
    name: 'Editor',
    components: {
      TinyMce,
    },
    props: {
      value: {
        required: true,
        default: '',
      },
      id: {
        type: String,
        default: 'd1',
      },
      toolbar: {
        type: String,
        default: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons mybutton',
      },
      plugins: {
        type: Array,
        default: () => {
          return [
            'autolink', 'charmap', 'code', 'colorpicker', 'contextmenu', 'fullscreen', 'hr', 'image', 'link',
            'lists', 'paste', 'preview', 'searchreplace', 'table', 'textcolor', 'wordcount',
          ]
        },
      },
      other_options: {
        type: Object,
        default: function () {
          return {
            height: 290,
            images_upload_handler: this.handleImageAdded,
          }
        },
      },
      readonly: {default: false, type: Boolean},
    },
    mounted() {
      this.content = this.value
    },
    beforeDestroy() {
      this.editor && this.editor.destroy()
    },
    data() {
      return {
        content: '',
        editor: null,
        checkerTimeout: null,
        isTyping: false,
        reRender: moment().format('DD-MM-YYYY HH:mm:ss'),
      }
    },
    methods: {
      ...mapActions('config', ['uploadImage']),
      init() {
        let options = {
          selector: '#' + this.id,
          skin: false,
          init_instance_callback: this.initEditor,
        }
        return this.concatAssciativeArrays(options, this.other_options)
      },
      initEditor(editor) {
        this.editor = editor
        editor.on('KeyUp', () => {
          this.submitNewContent()
        })
        editor.on('Change', (e) => {
          if (this.editor.getContent() !== this.value) {
            this.submitNewContent()
          }
          this.$emit('editorChange', e)
        })
        editor.on('init', () => {
          editor.setContent(this.content)
          this.$emit('input', this.content)
        })
        if (this.readonly) {
          this.editor.setMode('readonly')
        } else {
          this.editor.setMode('design')
        }
        this.$emit('editorInit', editor)
      },
      concatAssciativeArrays(array1, array2) {
        if (array2.length === 0) return array1
        if (array1.length === 0) return array2
        let dest = {}
        for (let key in array1) dest[key] = array1[key]
        for (let key in array2) dest[key] = array2[key]
        return dest
      },
      submitNewContent() {
        this.isTyping = true
        if (this.checkerTimeout !== null)
          clearTimeout(this.checkerTimeout)
        this.checkerTimeout = setTimeout(() => {
          this.isTyping = false
        }, 300)
        this.$emit('input', this.editor.getContent())
      },
      // up ảnh
      async handleImageAdded(file, success) {
        let formData = new FormData()
        formData.append('file', file.blob())
        await this.uploadImage({
          data: formData,
          cb: (response) => {
            if (response.code === 1) {
              success(response.data.path)
            } else {
              return false
            }
          },
        })
      },
    },
    watch: {
      value: function (newValue) {
        if (!this.isTyping) {
          this.content  = newValue
          this.reRender = moment().format('DD-MM-YYYY HH:mm:ss')
        }
      },
      readonly(value) {
        if (value) {
          this.editor.setMode('readonly')
        } else {
          this.editor.setMode('design')
        }
      },
    },
  }
</script>
