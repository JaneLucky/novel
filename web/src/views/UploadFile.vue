<template>
    <div>
        <form action="http://127.0.0.1:3000/upload/uploadFile" method="POST" enctype="multipart/form-data">
            <input type="file" name="mypic" /><br/>
            <input type="submit" value="上传文件"/>
        </form>
    </div>
</template>
<script>
export default {
    name:"UploadFile"
}
</script>