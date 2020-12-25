let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/projs/p/pi/user
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +5 server.js
badd +19 resources/users.js
badd +1 node_modules/jsonapi-server/lib/MemoryHandler.js
badd +31 handlers/usersHandler.js
badd +106 handlers/usersHandler2.js
argglobal
%argdel
edit handlers/usersHandler.js
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
34
normal! zo
37
normal! zo
37
normal! zo
60
normal! zo
75
normal! zo
80
normal! zo
81
normal! zo
96
normal! zo
99
normal! zo
100
normal! zo
116
normal! zo
118
normal! zo
134
normal! zo
136
normal! zo
154
normal! zo
165
normal! zo
165
normal! zo
178
normal! zo
58
normal! zo
73
normal! zo
78
normal! zo
79
normal! zo
94
normal! zo
97
normal! zo
98
normal! zo
114
normal! zo
116
normal! zo
132
normal! zo
134
normal! zo
152
normal! zo
163
normal! zo
163
normal! zo
176
normal! zo
let s:l = 72 - ((10 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
72
normal! 0
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
