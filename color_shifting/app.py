#!/usr/bin/env python
import sys

import cairo
import gi
from Pylette import extract_colors, Color
import numpy as np
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk
import colorsys



def get_palette(filename):
    palette = extract_colors(image=filename, palette_size=8)
    return [list(p.rgb) for p in palette]

def shifting(palette):
    total_shifting = 0
    """
    A ideia aqui seria fazer o seguinte, a cada iteração o total shifting aumentaria 1 até chegar 
    ao tamanho total da paleta, cada paleta procuraria o índice da sua cor na lista, e ao encontrar,
    procuraria a cor indiceDaCor + total_shifting (if > lista.length indice_novo % tamanho_da_paleta )
    """

    array = np.array(surface.get_data())
    data = np.frombuffer(surface.get_data(), dtype=np.uint32) 
    data = data.reshape((height, width))
    r = (data >> 16) & 0xFF  # Pegando os bits do vermelho
    g = (data >> 8) & 0xFF   # Pegando os bits do verde
    b = data & 0xFF          # Pegando os bits do azul
    rgb_array = np.stack([r, g, b], axis=-1) 

    for y in range(height):
        for x in range(width):
            r, g, b = rgb_array[y, x]  # Pegando os valores RGB
            for p in palette:
                print(r == p[0])
                print(g == p[1])
                print(b == p[2])


def draw_event(widget, ctx, surface):
    ctx.set_source_surface(surface, 0, 0)
    ctx.paint()

filename = 'waterfall.png'
surface = cairo.ImageSurface.create_from_png(filename)
width = surface.get_width()
height = surface.get_height()
palette = get_palette(filename)

shifting(palette)

win = Gtk.Window()
win.connect('destroy', Gtk.main_quit)



drawingarea = Gtk.DrawingArea()
win.add(drawingarea)
drawingarea.connect('draw', draw_event, surface)
drawingarea.set_size_request(width, height)

win.show_all()
Gtk.main()