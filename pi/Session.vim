let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/projs/p/pi
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +16 ~/projs/seq/config/config.js
badd +1 ~/projs/seq/.sequelizerc
badd +1 ~/projs/seq/index.js
badd +12 ~/projs/seq/index2.js
badd +15 models/user.js
badd +1 ~/projs/seq/models/user.js
badd +22 models/init-models.js
badd +26 models/role_permission.js
badd +20 models2/index-bck.js
badd +7 db/user_queries.sql
badd +24 db/user.sql
badd +1 migrate/migrate.js
badd +30 ~/projs/seq/models/index.js
badd +15 models/index.js
badd +1 models/permission.js
badd +4 seeders/seed.js
badd +18 migrate/index.js
badd +19 package.json
badd +13 test.js
badd +18 ~/projs/express-example/express-main-example/sequelize/index.js
badd +28 db/test2.js
badd +17 test2.js
badd +17 sqlite.js
badd +9 test3.js
badd +35 authenticate.js
argglobal
%argdel
edit migrate/migrate.js
set splitbelow splitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=9
setlocal fen
let s:l = 15 - ((3 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
15
normal! 035|
tabnext 1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
