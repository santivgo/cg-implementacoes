#!/usr/bin/env python
import sys
from palette import colors
import cairo
import gi
import numpy as np
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk,GLib

def convert_hex(hex):
    return hex.replace("#", "0xff")

def getAllColors(color):
    file = open('colors.txt', 'a')
    file.write(f"{color}\n")
    file.close()



def shifting():
    """
    A ideia aqui seria fazer o seguinte, a cada iteração o total shifting aumentaria 1 até chegar 
    ao tamanho total da paleta, cada paleta procuraria o índice da sua cor na lista, e ao encontrar,
    procuraria a cor indiceDaCor + total_shifting (if > lista.length indice_novo % tamanho_da_paleta )
    """

    arr = np.frombuffer(surface.get_data(), dtype=np.uint32).reshape((height, width))
    
    # tentar transformar isso em um set para nao se verificar todas as cores

    for y in range(height):
        for x in range(width):
            h = hex(arr[y,x])
            arr[y,x] = get_next_color(h, palette) # problema: paleta de cores não mt legal
    surface.mark_dirty()
    drawingarea.queue_draw()
    return True


    # print("atualizou 1 cor")
    # surface.mark_dirty()
    # drawingarea.queue_draw()
    # return True  




def get_next_color(hexColor, palette):
    neo_hex = hexColor
    if(neo_hex in palette):
        i_palette = palette.index(neo_hex)
        new_i_palette = (i_palette+1) % len(palette)
        neo_hex = palette[new_i_palette]
    return int(neo_hex,16)
    
    
    

def draw_event(widget, ctx, surface):
    ctx.set_source_surface(surface, 0, 0)
    ctx.paint()

def write_color(color):
    f = open('colors.txt', 'a')
    f.write(f'{color}\n')
    f.close()

filename = 'waterfall.png'
palette = [convert_hex(color) for color in colors.values()]

og_surface = cairo.ImageSurface.create_from_png(filename)
width = og_surface.get_width()
height = og_surface.get_height()

surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height) # duvida, usar esse formato msm?
ctx = cairo.Context(surface)
ctx.set_source_surface(og_surface, 0, 0)
ctx.paint() 



win = Gtk.Window()
win.connect('destroy', Gtk.main_quit)
drawingarea = Gtk.DrawingArea()
drawingarea.connect('draw', draw_event, surface)
drawingarea.set_size_request(width, height)
win.add(drawingarea)
win.show_all()
GLib.timeout_add(200, shifting)
# 
Gtk.main()