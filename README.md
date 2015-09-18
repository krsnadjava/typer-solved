# Typer Problem
A simple game made with Javascript.

You can find original problem [here](https://github.com/shendykurnia/typer)
    
## Answer
Sebutkan library apa saja yang dipakai, website library itu dimana, dan dokumentasi library itu ada dimana.

> jQuery
[Official website](https://jquery.com/) atau [Github](https://github.com/jquery/jquery)

> jQUery UI
[Official website](https://jqueryui.com/) atau [Github](https://github.com/jquery/jquery-ui)

> Underscore.js
[Official website](http://underscorejs.org/) atau [Github](https://github.com/jashkenas/underscore)

> Backbone.js
[Official website](http://backbonejs.org/) atau [Github](https://github.com/jashkenas/backbone)

> Bootstrap CSS
[Official website](http://getbootstrap.com/) atau [Github](https://github.com/twbs/bootstrap)

Aplikasi itu 'laggy'. Kenapa? Bagaimana cara membuat animasi lebih 'smooth'?

> Efek lag tersebut disebabkan oleh dua hal: penggunaan fungsi setInterval() dan layouting yang dilakukan secara bersamaan dalam suatu rendering. Fungsi setInterval dapat diganti dengan menggunakan fungsi requestAnimationFrame(). Lalu pada saat mengupdate nilai top elemen html, kita perlu memanggil fungsi jQuery .hide() sebelum mengupdate dan .show() setelah mengupdate untuk mempercepat kinerja dari jQuery UI.

Aplikasi itu tidak akan jalan di salah satu 3 browser populer (Chrome, Firefox, Internet Explorer)? Kenapa? Solusinya hanya menghapus satu character di code, character yang mana?

> Aplikasi tidak akan bekerja pada Internet Explorer versi terbaru (walaupun dapat dijalankan jika compability view diaktifkan). Hal ini terjadi karena terdapat kesalahan syntax pada javascript yang digunakan. Di dalam file "Typer.js" terdapat karakter koma ',' pada akhir baris ke 141 yang merupakan kesalahan syntax. Karakter tersebut harus dihapus.

Implementasikan tombol Start, Stop, Pause, dan Resume.
Ketika ukuran window dirubah, susunan huruf yang 'terbentur' batas window menjadi tidak 1 baris. Benarkan.
Implementasikan sistem score.
Implementasikan hukuman berupa pengurangan nilai bila salah ketik.

> See [source code](https://github.com/krsnadjava/typer-solved/blob/master/typer.js)