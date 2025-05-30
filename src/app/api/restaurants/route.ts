import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";


////////////////////CREATION DES ROUTES RESTAURANT////////////////////





////////////// GET //////////////

export async function GET(request: Request) {

  try {
    const restaurants = await prisma.restaurant.findMany();

    return NextResponse.json(restaurants, { status: 200 });

  } catch (error) {

    return NextResponse.json({ error: 'failed to fetch restaurants' }, { status: 500 });
  }
}



////////////// POST //////////////

export async function POST(request: Request) {

  try {
    const { name, address, email, role, password } = await request.json()

    //Vérifier que l'email est une chaine de caractères valide.
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required and must be a string' }, { status: 400 });
    }

    // Vérifier que le mot de passe est fourni.
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Crypter le mot de passe.
    const hashedPassword = await bcrypt.hash(password, 10); // Assurez-vous d'importer bcrypt

    //Création d'un nouveau restaurant avec Prisma.
    const newRestaurant = await prisma.restaurant.create({
      data: { name, address, email, role, password: hashedPassword } // Utiliser le mot de passe crypté
    })

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'failed to create restaurant' }, { status: 500 })
  }
}


////////////// UPDATE //////////////


export async function PATCH(request: Request) {
  try {
    const { id, password, ...data } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }

    // Crypter le mot de passe si un nouveau mot de passe est fourni
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de salage
      data.password = hashedPassword; // Remplacer le mot de passe en clair par le mot de passe crypté
    }

    const updatedRestaurant = await prisma.client.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedRestaurant, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}


////////////// DELETE //////////////


export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    //Je controle si l'id es bien un nombre.
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }
    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id }
    });

    return NextResponse.json(deletedRestaurant, { status: 200 });

  } catch (error) {

    return NextResponse.json({ error: 'Failed to delete restaurant' }, { status: 500 });
  }
}