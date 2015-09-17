## Typer Problem
    
Pertanyaan:   
1. Sebutkan library apa saja yang dipakai, website library itu dimana, dan dokumentasi library itu ada dimana.

- jQuery
[Official website](https://jquery.com/) atau [Github](https://github.com/jquery/jquery)

- jQUery UI
[Official website](https://jqueryui.com/) atau [Github](https://github.com/jquery/jquery-ui)

- Underscore.js
[Official website](http://underscorejs.org/) atau [Github](https://github.com/jashkenas/underscore)

- Backbone.js
[Official website](http://backbonejs.org/) atau [Github](https://github.com/jashkenas/backbone)

- Bootstrap CSS
[Official website](http://getbootstrap.com/) atau [Github](https://github.com/twbs/bootstrap)

2. Aplikasi itu 'laggy'. Kenapa? Bagaimana cara membuat animasi lebih 'smooth'?


3. Aplikasi itu tidak akan jalan di salah satu 3 browser populer (Chrome, Firefox, Internet Explorer)? Kenapa? Solusinya hanya menghapus satu character di code, character yang mana?

Aplikasi tidak akan bekerja pada Internet Explorer versi terbaru (walaupun dapat dijalankan jika compability view diaktifkan). Hal ini terjadi karena terdapat kesalahan syntax pada javascript yang digunakan. Di dalam file "Typer.js" terdapat karakter koma ',' pada akhir baris ke 141 yang merupakan kesalahan syntax. Karakter tersebut harus dihapus.

3. Implementasikan tombol Start, Stop, Pause, dan Resume.   
4. Ketika ukuran window dirubah, susunan huruf yang 'terbentur' batas window menjadi tidak 1 baris. Benarkan.    
5. Implementasikan sistem score.   
6. Implementasikan hukuman berupa pengurangan nilai bila salah ketik.

See source code