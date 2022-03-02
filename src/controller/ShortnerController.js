import ShortnerModel from "../model/ShortnerModel.js";
import crypto from "crypto";
import userAgent from "user-agent";



class ShortnerController {
  async index(request, response) {
    const shortners = await ShortnerModel.find().lean();

    response.json({ shortners });
  }

  async store(request, response) {
    //const body = request.body;

    const {link, name, expiredDate} = request.body;
    const [hash] = crypto.randomUUID().split("-");
    const shortner = await ShortnerModel.create({
      hash,
      link,
      name,
      expiredDate,
    });

    response.json({ shortner });
  }

  async update(request, response) {
    const { id } = request.params;
    const {link, name, expiredDate} = request.body;

    const shortner = await ShortnerModel.findByIdAndUpdate(
      id,
      {
        link,
        name,
        expiredDate,
      },
      { new: true }
    );


    response.json({ shortner} );
  }


  async remove(request, response) {
    const { id } = request.params;

    try{
      const shortner = await ShortnerModel.findById(id);

      if (shortner){
        await shortner.remove();

        response.json({ message: "Shortner Removed"});
      }

    }catch (error){
      response.status(400).json({ message : "Unexpected Error" })
    }
  }
  
  
  async getOne(request, response) {
    const {id} = request.params;

    try{
      const shortner = await ShortnerModel.findById(id);
      if (shortner) return response.json({ shortner });


      response.status(400).json({ message: "Shortner not Found" })

    }catch (error) {
      console.log(error.message);
      response.status(400).json({ message: "Unexpected Error" })
    }

    response.json({ shortner });
  }

  async redirect(request, response) {
    const { hash } = request.params;

    const userAgentDetailed = userAgent.parse(request.headers["user-agent"]);

    const metadata = {
      ip: request.ip,
      userAgent: request.headers["user-agent"],
      language: request.headers["accept-language"],
    }

    const shortner = await ShortnerModel.findOne({ hash });

    

    if (shortner){
      if (shortner.expired) return response.json({ message: "Link expired" });
      shortner.hits++;
      shortner.metadata.push(metadata);
      

      await shortner.save();
      // CHAMAR UMA FILA PARA ANALISAR OS DADOS DO USUARIO

      return response.redirect(shortner.link);
    }
    response.json({ message: "Redirecting" })
  }

}



export default ShortnerController;
