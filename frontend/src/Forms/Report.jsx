import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Report = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        county: '',
        subCounty: '',
        ward: '',
        village: '',
        reportType: '',
        title: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Comprehensive list of Kenyan counties, sub-counties, wards, and villages
    const counties = {
        "Nairobi": {
            subCounties: {
                "Westlands": { 
                    wards: {
                        "Parklands/Highridge": ["Parklands", "Highridge", "Westlands"],
                        "Kangemi": ["Kangemi", "Mountain View"],
                        "Karura": ["Karura", "Kitisuru"],
                        "Mountain View": ["Mountain View", "Loresho"],
                        "Kitisuru": ["Kitisuru", "Nyari"]
                    }
                },
                "Dagoretti North": { 
                    wards: {
                        "Kilimani": ["Kilimani", "Lavington"],
                        "Kawangware": ["Kawangware", "Gatina"],
                        "Gatina": ["Gatina", "Kabiro"],
                        "Kileleshwa": ["Kileleshwa", "Adams Arcade"],
                        "Kabiro": ["Kabiro", "Muthangari"]
                    }
                },
                "Dagoretti South": { 
                    wards: {
                        "Mutu-ini": ["Mutu-ini", "Ngando"],
                        "Ngando": ["Ngando", "Riruta"],
                        "Riruta": ["Riruta", "Uthiru"],
                        "Uthiru": ["Uthiru", "Waithaka"],
                        "Waithaka": ["Waithaka", "Dagoretti"]
                    }
                },
                "Langata": { 
                    wards: {
                        "Karen": ["Karen", "Nairobi South"],
                        "Nairobi West": ["Nairobi West", "Mugumo-ini"],
                        "Nyayo Highrise": ["Nyayo Highrise", "South C"],
                        "South C": ["South C", "Aerodrome"],
                        "Mugumo-ini": ["Mugumo-ini", "Langata"]
                    }
                },
                "Kibra": { 
                    wards: {
                        "Laini Saba": ["Laini Saba", "Sarangombe"],
                        "Lindi": ["Lindi", "Makina"],
                        "Makina": ["Makina", "Kibra"],
                        "Woodley/Kenyatta Golf Course": ["Woodley", "Kenyatta Golf Course"],
                        "Sarangombe": ["Sarangombe", "Kibra"]
                    }
                },
                "Roysambu": { 
                    wards: {
                        "Githurai": ["Githurai", "Kahawa West"],
                        "Kahawa West": ["Kahawa West", "Zimmerman"],
                        "Zimmerman": ["Zimmerman", "Roysambu"],
                        "Roysambu": ["Roysambu", "Kasarani"],
                        "Kahawa": ["Kahawa", "Githurai"]
                    }
                },
                "Kasarani": { 
                    wards: {
                        "Clay City": ["Clay City", "Mwiki"],
                        "Mwiki": ["Mwiki", "Kasarani"],
                        "Kasarani": ["Kasarani", "Njiru"],
                        "Njiru": ["Njiru", "Ruai"],
                        "Ruai": ["Ruai", "Kasarani"]
                    }
                },
                "Embakasi South": { 
                    wards: {
                        "Imara Daima": ["Imara Daima", "Kwa Njenga"],
                        "Kwa Njenga": ["Kwa Njenga", "Kwa Reuben"],
                        "Kwa Reuben": ["Kwa Reuben", "Pipeline"],
                        "Pipeline": ["Pipeline", "Kware"],
                        "Kware": ["Kware", "Embakasi"]
                    }
                },
                "Embakasi North": { 
                    wards: {
                        "Kariobangi North": ["Kariobangi North", "Dandora Area I"],
                        "Dandora Area I": ["Dandora Area I", "Dandora Area II"],
                        "Dandora Area II": ["Dandora Area II", "Dandora Area III"],
                        "Dandora Area III": ["Dandora Area III", "Dandora Area IV"],
                        "Dandora Area IV": ["Dandora Area IV", "Kariobangi"]
                    }
                },
                "Embakasi Central": { 
                    wards: {
                        "Kayole North": ["Kayole North", "Kayole Central"],
                        "Kayole Central": ["Kayole Central", "Kayole South"],
                        "Kayole South": ["Kayole South", "Komarock"],
                        "Komarock": ["Komarock", "Matopeni"],
                        "Matopeni": ["Matopeni", "Embakasi"]
                    }
                },
                "Embakasi East": { 
                    wards: {
                        "Upper Savanna": ["Upper Savanna", "Lower Savanna"],
                        "Lower Savanna": ["Lower Savanna", "Embakasi"],
                        "Embakasi": ["Embakasi", "Utawala"],
                        "Utawala": ["Utawala", "Mihang'o"],
                        "Mihang'o": ["Mihang'o", "Embakasi"]
                    }
                },
                "Embakasi West": { 
                    wards: {
                        "Umoja I": ["Umoja I", "Umoja II"],
                        "Umoja II": ["Umoja II", "Mowlem"],
                        "Mowlem": ["Mowlem", "Kariobangi South"],
                        "Kariobangi South": ["Kariobangi South", "Embakasi"],
                        "Embakasi": ["Embakasi", "Umoja"]
                    }
                },
                "Makadara": { 
                    wards: {
                        "Harambee": ["Harambee", "Makongeni"],
                        "Makongeni": ["Makongeni", "Maringo/Hamza"],
                        "Maringo/Hamza": ["Maringo", "Hamza"],
                        "Hamza": ["Hamza", "Viwandani"],
                        "Viwandani": ["Viwandani", "Makadara"]
                    }
                },
                "Kamukunji": { 
                    wards: {
                        "Pumwani": ["Pumwani", "Eastleigh North"],
                        "Eastleigh North": ["Eastleigh North", "Eastleigh South"],
                        "Eastleigh South": ["Eastleigh South", "Airbase"],
                        "Airbase": ["Airbase", "California"],
                        "California": ["California", "Kamukunji"]
                    }
                },
                "Starehe": { 
                    wards: {
                        "Nairobi Central": ["Nairobi Central", "Ngara"],
                        "Ngara": ["Ngara", "Pangani"],
                        "Pangani": ["Pangani", "Ziwani/Kariokor"],
                        "Ziwani/Kariokor": ["Ziwani", "Kariokor"],
                        "Landimawe": ["Landimawe", "Nairobi South"],
                        "Nairobi South": ["Nairobi South", "Starehe"]
                    }
                },
                "Mathare": { 
                    wards: {
                        "Hospital": ["Hospital", "Mabatini"],
                        "Mabatini": ["Mabatini", "Huruma"],
                        "Huruma": ["Huruma", "Ngei"],
                        "Ngei": ["Ngei", "Mlango Kubwa"],
                        "Mlango Kubwa": ["Mlango Kubwa", "Kiamaiko"],
                        "Kiamaiko": ["Kiamaiko", "Mathare"]
                    }
                }
            }
        },
        "Mandera": {
            subCounties: {
                "Mandera East": {
                    wards: {
                        "Arabia": ["Arabia", "Bulla Mpya", "Sala"],
                        "Bulla Mpya": ["Bulla Mpya", "Nursery", "Township"],
                        "Bulla Power": ["Bulla Power", "Customs", "Nazareth"],
                        "Dandu": ["Dandu", "Guba", "Gurufa"],
                        "Khalalio": ["Khalalio", "Fino", "Lafey"],
                        "Kotulo": ["Kotulo", "Warankara", "Rhamu"],
                        "Libehia": ["Libehia", "Malkamari", "Elsere"]
                    }
                },
                "Mandera North": {
                    wards: {
                        "Elwak North": ["Elwak", "Gurar", "Buria"],
                        "Elwak South": ["Elwak Town", "Dandu", "Ashabito"],
                        "Shimbir Fatuma": ["Shimbir Fatuma", "Guba", "Bulla Kariba"],
                        "Fino": ["Fino", "Lafey", "Warankara"],
                        "Lafey": ["Lafey Town", "Alungu", "Gurufa"],
                        "Warankara": ["Warankara", "Rhamu Dimtu", "Malkamari"]
                    }
                },
                "Mandera South": {
                    wards: {
                        "Takaba North": ["Takaba", "Gither", "Kiliwehiri"],
                        "Takaba South": ["Takaba Town", "Dandu", "Rhamu"],
                        "Gither": ["Gither", "Koromey", "Malkamari"],
                        "Kutulo": ["Kutulo", "Warankara", "Rhamu"],
                        "Lagboghol South": ["Lagboghol", "Sala", "Fino"],
                        "Malkamari": ["Malkamari", "Gurufa", "Elsere"]
                    }
                },
                "Mandera West": {
                    wards: {
                        "Khalalio": ["Khalalio", "Guba", "Bulla Kariba"],
                        "Kiliwehiri": ["Kiliwehiri", "Gither", "Koromey"],
                        "Bamboo": ["Bamboo", "Ashabito", "Gurar"],
                        "Rhamu": ["Rhamu", "Dimtu", "Township"],
                        "Rhamu Dimtu": ["Rhamu Dimtu", "Warankara", "Malkamari"]
                    }
                },
                "Banisa": {
                    wards: {
                        "Banisa": ["Banisa Town", "Guba", "Buria"],
                        "Derkhale": ["Derkhale", "Gurufa", "Elsere"],
                        "Guba": ["Guba", "Bulla Kariba", "Malkamari"],
                        "Malkamari": ["Malkamari", "Gurufa", "Elsere"],
                        "Kiliwehiri": ["Kiliwehiri", "Gither", "Koromey"]
                    }
                },
                "Lafey": {
                    wards: {
                        "Sala": ["Sala", "Fino", "Lafey"],
                        "Fino": ["Fino", "Lafey Town", "Alungu"],
                        "Lafey": ["Lafey", "Gurufa", "Elsere"],
                        "Alungu": ["Alungu", "Gurufa", "Malkamari"],
                        "Warankara": ["Warankara", "Rhamu Dimtu", "Malkamari"]
                    }
                }
            }
        },
        "Wajir": {
            subCounties: {
                "Wajir East": {
                    wards: {
                        "Bura": ["Bura Town", "Sarman", "Tarbaj"],
                        "Dadajabulla": ["Dadajabulla", "Dandu", "Libehia"],
                        "Habasswein": ["Habasswein", "Sala", "Guba"],
                        "Lagboghol North": ["Lagboghol", "Sala", "Fino"],
                        "Sala": ["Sala", "Fino", "Lafey"],
                        "Wajir Bor": ["Wajir Bor", "Township", "Nazareth"]
                    }
                },
                "Wajir West": {
                    wards: {
                        "Batalu": ["Batalu", "Guba", "Buria"],
                        "Benane": ["Benane", "Gurufa", "Elsere"],
                        "Derkhale": ["Derkhale", "Gurufa", "Elsere"],
                        "Griftu": ["Griftu", "Bulla Kariba", "Malkamari"],
                        "Hadado": ["Hadado", "Gither", "Koromey"],
                        "Athibohol": ["Athibohol", "Ashabito", "Gurar"]
                    }
                },
                "Wajir South": {
                    wards: {
                        "Abakore": ["Abakore", "Sarman", "Tarbaj"],
                        "Ganyure": ["Ganyure", "Dandu", "Libehia"],
                        "Gurar": ["Gurar", "Sala", "Guba"],
                        "Wajir South": ["Wajir South", "Sala", "Fino"],
                        "Buna": ["Buna", "Fino", "Lafey"],
                        "Bute": ["Bute", "Township", "Nazareth"]
                    }
                },
                "Wajir North": {
                    wards: {
                        "Barsombe": ["Barsombe", "Guba", "Buria"],
                        "Batalu": ["Batalu", "Gurufa", "Elsere"],
                        "Derkhale": ["Derkhale", "Gurufa", "Elsere"],
                        "Eldas": ["Eldas", "Bulla Kariba", "Malkamari"],
                        "Griftu": ["Griftu", "Gither", "Koromey"],
                        "Khorof/Harar": ["Khorof/Harar", "Ashabito", "Gurar"]
                    }
                },
                "Tarbaj": {
                    wards: {
                        "Sala": ["Sala", "Sarman", "Tarbaj"],
                        "Tarbaj": ["Tarbaj", "Dandu", "Libehia"],
                        "Danaba": ["Danaba", "Sala", "Guba"],
                        "Qaraqana": ["Qaraqana", "Sala", "Fino"],
                        "Abakore": ["Abakore", "Fino", "Lafey"],
                        "Guba": ["Guba", "Township", "Nazareth"]
                    }
                },
                "Eldas": {
                    wards: {
                        "Eldas": ["Eldas Town", "Guba", "Buria"],
                        "Derkhale": ["Derkhale", "Gurufa", "Elsere"],
                        "Guba": ["Guba", "Gurufa", "Elsere"],
                        "Nanam": ["Nanam", "Bulla Kariba", "Malkamari"],
                        "Hadado": ["Hadado", "Gither", "Koromey"],
                        "Athibohol": ["Athibohol", "Ashabito", "Gurar"]
                    }
                }
            }
        },
        "Garissa": {
            subCounties: {
                "Garissa Township": {
                    wards: {
                        "Garissa Central": ["Garissa Central", "Township", "Nazareth"],
                        "Iftin": ["Iftin", "Soko Mjinga", "Bulla Mpya"],
                        "Ziwani": ["Ziwani", "Makaburini", "Bulla Power"],
                        "Soko Mjinga": ["Soko Mjinga", "Bulla Kariba", "Malkamari"],
                        "Bulla Mpya": ["Bulla Mpya", "Nursery", "Township"]
                    }
                },
                "Balambala": {
                    wards: {
                        "Balambala": ["Balambala Town", "Sala", "Guba"],
                        "Saka": ["Saka", "Dandu", "Libehia"],
                        "Jarajila": ["Jarajila", "Sala", "Guba"],
                        "Sankuri": ["Sankuri", "Sala", "Fino"],
                        "Masalani": ["Masalani", "Fino", "Lafey"]
                    }
                },
                "Lagdera": {
                    wards: {
                        "Bashira": ["Bashira", "Sarman", "Tarbaj"],
                        "Sabena": ["Sabena", "Dandu", "Libehia"],
                        "Baraki": ["Baraki", "Sala", "Guba"],
                        "Danyere": ["Danyere", "Sala", "Fino"],
                        "Godoma": ["Godoma", "Fino", "Lafey"]
                    }
                },
                "Dadaab": {
                    wards: {
                        "Dagahaley": ["Dagahaley", "Sarman", "Tarbaj"],
                        "Liboi": ["Liboi", "Dandu", "Libehia"],
                        "Abakaile": ["Abakaile", "Sala", "Guba"],
                        "Dadaab": ["Dadaab", "Sala", "Fino"],
                        "Damajale": ["Damajale", "Fino", "Lafey"]
                    }
                },
                "Fafi": {
                    wards: {
                        "Bura": ["Bura Town", "Sarman", "Tarbaj"],
                        "Dekaharia": ["Dekaharia", "Dandu", "Libehia"],
                        "Jarajila": ["Jarajila", "Sala", "Guba"],
                        "Fafi": ["Fafi", "Sala", "Fino"],
                        "Nanighi": ["Nanighi", "Fino", "Lafey"]
                    }
                },
                "Ijara": {
                    wards: {
                        "Ijara": ["Ijara Town", "Sarman", "Tarbaj"],
                        "Masalani": ["Masalani", "Dandu", "Libehia"],
                        "Sangailu": ["Sangailu", "Sala", "Guba"],
                        "Kotile": ["Kotile", "Sala", "Fino"],
                        "Hulugho": ["Hulugho", "Fino", "Lafey"]
                    }
                }
            }
        },
        "Mombasa": {
            subCounties: {
                "Changamwe": {
                    wards: {
                        "Port Reitz": ["Port Reitz", "Kipevu", "Airport"],
                        "Kipevu": ["Kipevu", "Miritini", "Chaani"],
                        "Miritini": ["Miritini", "Magogoni", "Jomvu Kuu"],
                        "Magogoni": ["Magogoni", "Jomvu Kuu", "Mikindani"]
                    }
                },
                "Jomvu": {
                    wards: {
                        "Jomvu Kuu": ["Jomvu Kuu", "Mikindani", "Miritini"],
                        "Mikindani": ["Mikindani", "Mjambere", "Jomvu"],
                        "Mjambere": ["Mjambere", "Jomvu", "Mikindani"]
                    }
                },
                "Kisauni": {
                    wards: {
                        "Mtongwe": ["Mtongwe", "Shika Adabu", "Bofu"],
                        "Shika Adabu": ["Shika Adabu", "Bofu", "Mjambere"],
                        "Bofu": ["Bofu", "Mjambere", "Mikindani"],
                        "Likoni": ["Likoni", "Mtongwe", "Shika Adabu"]
                    }
                },
                "Likoni": {
                    wards: {
                        "Likoni": ["Likoni", "Mtongwe", "Shika Adabu"],
                        "Timbwani": ["Timbwani", "Mji Wa Kale", "Mtongwe"],
                        "Mji Wa Kale": ["Mji Wa Kale", "Mtongwe", "Shika Adabu"],
                        "Shika Adabu": ["Shika Adabu", "Bofu", "Mjambere"]
                    }
                },
                "Mvita": {
                    wards: {
                        "Mji Wa Kale": ["Mji Wa Kale", "Tudor", "Makadara"],
                        "Tudor": ["Tudor", "Makadara", "Tononoka"],
                        "Makadara": ["Makadara", "Tononoka", "Majengo"],
                        "Tononoka": ["Tononoka", "Majengo", "Bondeni"]
                    }
                },
                "Nyali": {
                    wards: {
                        "Kongowea": ["Kongowea", "Kadzandani", "Bamburi"],
                        "Kadzandani": ["Kadzandani", "Bamburi", "Mkomani"],
                        "Bamburi": ["Bamburi", "Mkomani", "Mtopanga"],
                        "Mkomani": ["Mkomani", "Mtopanga", "Kongowea"]
                    }
                }
            }
        },
        "Kisumu": {
            subCounties: {
                "Kisumu Central": {
                    wards: {
                        "Kisumu Central": ["Kisumu Central", "Kisumu Town", "Nyalenda"],
                        "Kajulu": ["Kajulu", "Kolwa East", "Kolwa Central"],
                        "Kolwa East": ["Kolwa East", "Kolwa Central", "Kisumu"],
                        "Kolwa Central": ["Kolwa Central", "Kisumu", "Nyalenda"]
                    }
                },
                "Kisumu East": {
                    wards: {
                        "Kajulu": ["Kajulu", "Kolwa East", "Kolwa Central"],
                        "Kolwa East": ["Kolwa East", "Kolwa Central", "Kisumu"],
                        "Kolwa Central": ["Kolwa Central", "Kisumu", "Nyalenda"],
                        "Nyalenda": ["Nyalenda", "Kisumu", "Kajulu"]
                    }
               },
                "Kisumu West": {
                    wards: {
                        "Kisumu West": ["Kisumu West", "Kisumu Town", "Nyalenda"],
                        "Kajulu": ["Kajulu", "Kolwa East", "Kolwa Central"],
                        "Kolwa East": ["Kolwa East", "Kolwa Central", "Kisumu"],
                        "Kolwa Central": ["Kolwa Central", "Kisumu", "Nyalenda"]
                    }
                },
                "Seme": {
                    wards: {
                        "Seme": ["Seme", "Kisumu Town", "Nyalenda"],
                        "Kajulu": ["Kajulu", "Kolwa East", "Kolwa Central"],
                        "Kolwa East": ["Kolwa East", "Kolwa Central", "Kisumu"],
                        "Kolwa Central": ["Kolwa Central", "Kisumu", "Nyalenda"]
                    }
                },
                "Muhoroni": {
                    wards: {
                        "Muhoroni": ["Muhoroni", "Kisumu Town", "Nyalenda"],
                        "Kajulu": ["Kajulu", "Kolwa East", "Kolwa Central"],
                        "Kolwa East": ["Kolwa East", "Kolwa Central", "Kisumu"],
                        "Kolwa Central": ["Kolwa Central", "Kisumu", "Nyalenda"]
                    }
                },
                "Nyando": {
                    wards: {
                        "Nyando": ["Nyando", "Kisumu Town", "Nyalenda"],
                        "Kajulu": ["Kajulu", "Kolwa East", "Kolwa Central"],
                        "Kolwa East": ["Kolwa East", "Kolwa Central", "Kisumu"],
                        "Kolwa Central": ["Kolwa Central", "Kisumu", "Nyalenda"]
                    }
                }
            }
        },
        "Nakuru": {
            subCounties: {
                "Nakuru Town East": {
                    wards: {
                        "Nakuru East": ["Nakuru East", "Nakuru Town", "Kivumbini"],
                        "Kivumbini": ["Kivumbini", "Flamingo", "Menengai"],
                        "Flamingo": ["Flamingo", "Menengai", "Nakuru"],
                        "Menengai": ["Menengai", "Nakuru", "Kivumbini"]
                    }
                },
                "Nakuru Town West": {
                    wards: {
                        "Nakuru West": ["Nakuru West", "Nakuru Town", "Kivumbini"],
                        "Kivumbini": ["Kivumbini", "Flamingo", "Menengai"],
                        "Flamingo": ["Flamingo", "Menengai", "Nakuru"],
                        "Menengai": ["Menengai", "Nakuru", "Kivumbini"]
                    }
                },
                "Naivasha": {
                    wards: {
                        "Naivasha East": ["Naivasha East", "Naivasha Town", "Kihoto"],
                        "Naivasha West": ["Naivasha West", "Naivasha Town", "Kihoto"],
                        "Kihoto": ["Kihoto", "Naivasha", "Karai"],
                        "Karai": ["Karai", "Naivasha", "Kihoto"]
                    }
                },
                "Gilgil": {
                    wards: {
                        "Gilgil": ["Gilgil", "Naivasha Town", "Kihoto"],
                        "Elementaita": ["Elementaita", "Naivasha", "Karai"],
                        "Mbaruk": ["Mbaruk", "Naivasha", "Kihoto"],
                        "Malewa West": ["Malewa West", "Naivasha", "Karai"]
                    }
                },
                "Njoro": {
                    wards: {
                        "Njoro": ["Njoro", "Naivasha Town", "Kihoto"],
                        "Mauche": ["Mauche", "Naivasha", "Karai"],
                        "Mau Narok": ["Mau Narok", "Naivasha", "Kihoto"],
                        "Kihingo": ["Kihingo", "Naivasha", "Karai"]
                    }
                },
                "Molo": {
                    wards: {
                        "Molo": ["Molo", "Naivasha Town", "Kihoto"],
                        "Elburgon": ["Elburgon", "Naivasha", "Karai"],
                        "Turi": ["Turi", "Naivasha", "Kihoto"],
                        "Mariashoni": ["Mariashoni", "Naivasha", "Karai"]
                    }
                }
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // If county, subCounty, or ward changes, reset the dependent fields
        if (name === "county") {
            setFormData({ 
                ...formData, 
                [name]: value,
                subCounty: "",
                ward: "",
                village: ""
            });
        } else if (name === "subCounty") {
            setFormData({ 
                ...formData, 
                [name]: value,
                ward: "",
                village: ""
            });
        } else if (name === "ward") {
            setFormData({ 
                ...formData, 
                [name]: value,
                village: ""
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await apiService.createReport(formData);
            setSuccess('Report submitted successfully!');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError(error.message || 'Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get sub-counties for the selected county
    const getSubCounties = () => {
        if (formData.county && counties[formData.county]) {
            return Object.keys(counties[formData.county].subCounties);
        }
        return [];
    };

    // Helper function to get wards for the selected sub-county
    const getWards = () => {
        if (formData.county && formData.subCounty && counties[formData.county]?.subCounties[formData.subCounty]) {
            return Object.keys(counties[formData.county].subCounties[formData.subCounty].wards);
        }
        return [];
    };

    // Helper function to get villages for the selected ward
    const getVillages = () => {
        if (formData.county && formData.subCounty && formData.ward && 
            counties[formData.county]?.subCounties[formData.subCounty]?.wards[formData.ward]) {
            return counties[formData.county].subCounties[formData.subCounty].wards[formData.ward] || [];
        }
        return [];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br bg-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-grey-900 dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Report an Issue
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Help us improve by reporting any issues or concerns you encounter
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-green-600 dark:text-green-400">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus极速飞艇:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    County *
                                </label>
                                <select
                                    name="county"
                                    required
                                    value={formData.county}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                >
                                    <option value="">Select County</option>
                                    {Object.keys(counties).map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Sub-County
                                </label>
                                <select
                                    name="subCounty"
                                    value={formData.subCounty}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    disabled={!formData.county}
                                >
                                    <option value="">Select Sub-County</option>
                                    {getSubCounties().map((sc) => (
                                        <option key={sc} value={sc}>{sc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ward
                                </label>
                                <select
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    disabled={!formData.subCounty}
                                >
                                    <option value="">Select Ward</option>
                                    {getWards().map((w) => (
                                        <option key={w} value={w}>{w}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Village/Estate
                                </label>
                                <select
                                    name="village"
                                    value={formData.village}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    disabled={!formData.ward}
                                >
                                    <option value="">Select Village</option>
                                    {getVillages().map((v) => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Report Type *
                            </label>
                            <select
                                name="reportType"
                                required
                                value={formData.reportType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                            >
                                <option value="">Select Type</option>
                                <option value="Fraud">Fraud</option>
                                <option value="Delay">Delayed Response</option>
                                <option value="Ineligibility">Ineligibility Concern</option>
                                <option value="Corruption">Corruption</option>
                                <option value="Technical">Technical Issue</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Report Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                                placeholder="e.g. Suspected misuse of funds"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Detailed Explanation *
                            </label>
                            <textarea
                                name="description"
                                required
                                rows="6"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-极速飞艇700 dark:text-white transition-colors"
                                placeholder="Describe the issue clearly and provide any relevant details..."
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                {loading ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Report;