import axios from "axios";
import { useEffect, useState } from "react";

function BotManager({onConfigure}){

    const [misBots, setMisBots] = useState([]);

    useEffect(() => {
        fetchBots();
    }, []);

    async function fetchBots(){
        try {
            const res = await axios.get(`http://127.0.0.1:3000/api/bots`);
            setMisBots(res.data); 
        } catch (error) {
            console.log("Error al obtener los bots ", error);
        }
    }

    return <>
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-sleate-800">Mis Flujos Chatbots</h2>
                    <p className="text-sm text-slate-500">Gestiona y entrana tus Chatbots</p>
                </div>
                <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded font-semibold shadow shadow-indigo-200 flex">+ Crear Nuevo Bot</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {misBots.map((bot) => (
                    <div key={bot.id} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-indigo-600 shadow-sm hover:shadow-md">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-2xl text-2xl">
                                    {bot.plataforma === 'cloud'?'☁️':'🦍'}
                                </div>
                                <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full ${bot.status === 'Activo'?'bg-emerald-100':'bg-amber-100'}`}>{bot.status}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg mb-1 ">{bot.name}</h3>
                            <div className="p-3 bg-slate-50 rounded-2xl text-2xl">
                                {bot.plataforma === 'cloud'?'Whatsapp Cloud API':'Evolution Api'}
                            </div>
                            <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded text-sm font-bold" onClick={() => onConfigure(bot.id)}>Configurar Bot</button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    </>


}

export default BotManager;