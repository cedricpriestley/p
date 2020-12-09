let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/projs/p/pi/user
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +16 ~/projs/seq/config/config.js
badd +1 ~/projs/seq/.sequelizerc
badd +1 ~/projs/seq/index.js
badd +12 ~/projs/seq/index2.js
badd +15 ~/projs/p/pi/models/user.js
badd +1 ~/projs/seq/models/user.js
badd +22 ~/projs/p/pi/models/init-models.js
badd +26 ~/projs/p/pi/models/role_permission.js
badd +20 models2/index-bck.js
badd +7 ~/projs/p/pi/db/user_queries.sql
badd +24 ~/projs/p/pi/db/user.sql
badd +22 ~/projs/p/pi/migrate/migrate.js
badd +30 ~/projs/seq/models/index.js
badd +15 ~/projs/p/pi/models/index.js
badd +1 ~/projs/p/pi/models/permission.js
badd +4 ~/projs/p/pi/seeders/seed.js
badd +18 ~/projs/p/pi/migrate/index.js
badd +16 ~/projs/p/pi/package.json
badd +13 ~/projs/p/pi/test.js
badd +18 ~/projs/express-example/express-main-example/sequelize/index.js
badd +28 ~/projs/p/pi/db/test2.js
badd +17 ~/projs/p/pi/test2.js
badd +17 ~/projs/p/pi/sqlite.js
badd +9 ~/projs/p/pi/test3.js
badd +35 ~/projs/p/pi/authenticate.js
badd +18 ~/projs/p/pi/knex.js
badd +1 ~/projs/p/pi/knex/index.js
badd +14 knexfile.js
badd +8 migrations/20201209003902_roles.js
badd +29 migrations/users.js
argglobal
%argdel
edit migrations/users.js
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
1
normal! zo
108
normal! zo
let s:l = 108 - ((14 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
108
normal! 011|
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
