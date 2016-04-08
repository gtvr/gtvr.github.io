var ref = new Firebase("https://gtvr-qa.firebaseio.com");

var postsRef = ref.child("qa");
var newPostRef = postsRef.push();
newPostRef.set({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
});
