<template>
  <div class="components-container">
    <code>
      Based on <a class="link-type" href="https://github.com/rowanwins/vue-dropzone"> dropzone </a>.
      {{ $t('components.dropzoneTips') }}
    </code>
    <div class="editor-container">
      <drop-zone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR"
                @dropzone-success="dropzoneS"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { DropZone } from '@/components';

  @Component({
    components: {
      DropZone
    }
  })
  export default class DragZoneView extends Vue {
    dropzoneS(file) {
      console.log(file);
      this.$message({message: 'Upload success', type: 'success'});
    }

    dropzoneR(file) {
      console.log(file);
      this.$message({message: 'Delete success', type: 'success'});
    }
  }
</script>
