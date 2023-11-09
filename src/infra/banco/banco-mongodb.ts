import { c } from "vitest/dist/reporters-5f784f42";
import FIlmeRepositorioInterface from "../../aplicacao/filme-repositorio-interface";
import mongoose from 'mongoose';
require('dotenv').config()
export default class BancoMongoDB implements FIlmeRepositorioInterface{
    private filmeModel: any;
  constructor(){
    try{
        mongoose.connect(process.env.MONGODB_URL || '')
        console.log("Conectado ao banco de dados")
    }catch(error){
        console.log(error)
    }
    this.filmeModel = mongoose.model('Filme', new mongoose.Schema({
        _id: String,
        titulo: String,
        descricao: String,
        foto: String
    })
    )
  }
  public async salvar(filme:Filme): Promise<boolean> {
    const FilmeDTO = { 
        _id: filme.id,
        titulo: filme.titulo,
        descricao: filme.descricao,
        foto: filme.foto
    }
    const filmeModel = new this.filmeModel(FilmeDTO)
    const result = await filmeModel.save()
    return !! result
  }
}
type Filme = {  
    id: string;
    titulo: string;
    descricao: string;
    foto: string
}
type FilmeDTO = {
    id: string;
    titulo: string;
    descricao: string;
    foto: string
}