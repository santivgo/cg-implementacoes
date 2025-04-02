#!/usr/bin/env python
import sys
from palette import colors
import cairo
import gi
import numpy as np
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk,GLib
import colorsys


def getAllColors(color):
    file = open('colors.txt', 'a')
    file.write(f"{color}\n")
    file.close()
def convert_hex(hex):
    return hex.replace("#", "0xff")

def shifting(palette, surface):
    """
    A ideia aqui seria fazer o seguinte, a cada iteração o total shifting aumentaria 1 até chegar 
    ao tamanho total da paleta, cada paleta procuraria o índice da sua cor na lista, e ao encontrar,
    procuraria a cor indiceDaCor + total_shifting (if > lista.length indice_novo % tamanho_da_paleta )
    """

    data = np.frombuffer(surface.get_data(), dtype=np.uint32) 
    data = data.reshape((height, width))
    
    # tentar transformar isso em um set para nao se verificar todas as cores

    for i in range(len(palette)):
        for y in range(height):
            for x in range(width):
                #getAllColors(hex(data[y,x]))
                data[y,x] = get_next_color(hex(data[y,x]), palette) # problema: paleta de cores não mt legal
        surface.write_to_png(f"output{i}.png")

    # print("atualizou 1 cor")
    # surface.mark_dirty()
    # drawingarea.queue_draw()
    # return True  




def get_next_color(hexColor, palette):
    neo_hex = hexColor
    if(neo_hex in palette):
        i_palette = palette.index(neo_hex)
        new_i_palette = (i_palette+1) % len(palette)-1
        neo_hex = palette[new_i_palette]
        print("achoo...")

        return int(neo_hex,16)
    return int('0xffFF0000',16)
    
    

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

# surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height) # duvida, usar esse formato msm?

shifting(palette, og_surface)
ctx = cairo.Context(og_surface)
ctx.set_source_surface(og_surface, 0, 0)
ctx.paint() 


win = Gtk.Window()
win.connect('destroy', Gtk.main_quit)
drawingarea = Gtk.DrawingArea()



win.add(drawingarea)
drawingarea.connect('draw', draw_event, og_surface)
drawingarea.set_size_request(width, height)

win.show_all()
# GLib.timeout_add(100, shifting)
Gtk.main()