import axios from "axios";
import { useEffect, useState } from "react";

function BotManager({onConfigure}){

    const [misBots, setMisBots] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBot, setNewBot] = useState({name: "", plataforma: "cloud", identifier: ""})

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

    const handleCreateBot = async (e) => {
        e.preventDefault();


        try {
            const res = await axios.post('http://127.0.0.1:3000/api/bots', newBot);
            // setMisBots([res.data, ...misBots]);
            fetchBots()
            setIsModalOpen(false);
        } catch (error) {
            alert("Error al crear el bot");
        }
    }

    return <>
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-sleate-800">Mis Flujos Chatbots</h2>
                    <p className="text-sm text-slate-500">Gestiona y entrana tus Chatbots</p>
                </div>
                <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded font-semibold shadow shadow-indigo-200 flex" onClick={() => setIsModalOpen(true)}>+ Crear Nuevo Bot</button>
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

        {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl ">
                    <h2 className="tet-2xl font-black text-slate-800 mb-2">Nuevo Chatbot</h2>
                    <p>Configura tu chatbot</p>
                    <form onSubmit={handleCreateBot} className="space-y-6">
                        <div>
                            <label htmlFor="">Nombre del Bot</label>
                            <input type="text" required className="w-full mt-1 p-4 bg-slate-50 border-2 border-transparent rounded-2xl" placeholder="Ej. Asistente Inmobiliario" onChange={(e) =>setNewBot({...newBot, name: e.target.value})} />
                        </div>
                        <div>
                            <label htmlFor="">Identificador (PhoneID/Instancia)</label>
                            <input type="text" required className="w-full mt-1 p-4 bg-slate-50 border-2 border-transparent rounded-2xl" placeholder="59173277937" onChange={(e) =>setNewBot({...newBot, identifier: e.target.value})} />
                        </div>
                        <div>
                            <label htmlFor="">Plataforma</label>
                            <select name="" id="" className="w-full mt-1 p-4 bg-slate-50 border-2 border-transparent rounded-2xl">
                                <option value="cloud">Whatsapp Cloud API</option>
                                <option value="evolution">Evolution API</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-100 ">Cancelar</button>
                            <button type="submit" className="flex-1 px-6 py-4 rounded-2xl font-bold text-white hover:bg-indigo-700 bg-indigo-600">Crear Bot</button>

                        </div>
                    </form>
                </div>
            </div>
        )}
    </>


}

export default BotManager;