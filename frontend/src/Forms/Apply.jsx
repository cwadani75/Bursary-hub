import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  GraduationCap,
  DollarSign,
  Upload,
  CheckCircle,
} from "lucide-react";
import apiService from "../services/api";

const Apply = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    gender: "",
    dob: "",
    county: "",
    subCounty: "",
    ward: "",
    village: "",
    institution: "",
    course: "",
    yearOfStudy: "",
    feeAmount: "",
    familyIncome: "",
    reason: "",
  });

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
            "Kolwa Central": ["Kolwa Central", "Kisumu", "Nyalenda"
            ]
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
            "Turi": ["Turin", "Naivasha", "Kihoto"],
            "Mariashoni": ["Mariashoni", "Naivasha", "Karai"]
          }
        }
      }
    },
    "Uasin Gishu": {
      subCounties: {
        "Eldoret East": {
          wards: {
            "Eldoret East": ["Eldoret East", "Eldoret Town", "Kipkaren"],
            "Kipkaren": ["Kipkaren", "Eldoret", "Ngeria"],
            "Ngeria": ["Ngeria", "Eldoret", "Kipkaren"],
            "Kapsaret": ["Kapsaret", "Eldoret", "Ngeria"]
          }
        },
        "Eldoret West": {
          wards: {
            "Eldoret West": ["Eldoret West", "Eldoret Town", "Kipkaren"],
            "Kipkaren": ["Kipkaren", "Eldoret", "Ngeria"],
            "Ngeria": ["Ngeria", "Eldoret", "Kipkaren"],
            "Kapsaret": ["Kapsaret", "Eldoret", "Ngeria"]
          }
        },
        "Eldoret North": {
          wards: {
            "Eldoret North": ["Eldoret North", "Eldoret Town", "Kipkaren"],
            "Kipkaren": ["Kipkaren", "Eldoret", "Ngeria"],
            "Ngeria": ["Ngeria", "Eldoret", "Kipkaren"],
            "Kapsaret": ["Kapsaret", "Eldoret", "Ngeria"]
          }
        },
        "Eldoret South": {
          wards: {
            "Eldoret South": ["Eldoret South", "Eldoret Town", "Kipkaren"],
            "Kipkaren": ["Kipkaren", "Eldoret", "Ngeria"],
            "Ngeria": ["Ngeria", "Eldoret", "Kipkaren"],
            "Kapsaret": ["Kapsaret", "Eldoret", "Ngeria"]
          }
        },
        "Ainabkoi": {
          wards: {
            "Ainabkoi": ["Ainabkoi", "Eldoret Town", "Kipkaren"],
            "Kapsoya": ["Kapsoya", "Eldoret", "Ngeria"],
            "Kaptagat": ["Kaptagat", "Eldoret", "Kipkaren"],
            "Kipkenyo": ["Kipkenyo", "Eldoret", "Ngeria"]
          }
        },
        "Kapseret": {
          wards: {
            "Kapseret": ["Kapseret", "Eldoret Town", "Kipkaren"],
            "Kipkenyo": ["Kipkenyo", "Eldoret", "Ngeria"],
            "Kipkaren": ["Kipkaren", "Eldoret", "Ngeria"],
            "Ngeria": ["Ngeria", "Eldoret", "Kipkaren"]
          }
        }
      }
    },
    "Kakamega": {
      subCounties: {
        "Kakamega Central": {
          wards: {
            "Kakamega Central": ["Kakamega Central", "Kakamega Town", "Shinyalu"],
            "Shinyalu": ["Shinyalu", "Kakamega", "Butere"],
            "Butere": ["Butere", "Kakamega", "Shinyalu"],
            "Khwisero": ["Khwisero", "Kakamega", "Butere"]
          }
        },
        "Kakamega East": {
          wards: {
            "Kakamega East": ["Kakamega East", "Kakamega Town", "Shinyalu"],
            "Shinyalu": ["Shinyalu", "Kakamega", "Butere"],
            "Butere": ["Butere", "Kakamega", "Shinyalu"],
            "Khwisero": ["Khwisero", "Kakamega", "Butere"]
          }
        },
        "Kakamega North": {
          wards: {
            "Kakamega North": ["Kakamega North", "Kakamega Town", "Shinyalu"],
            "Shinyalu": ["Shinyalu", "Kakamega", "Butere"],
            "Butere": ["Butere", "Kakamega", "Shinyalu"],
            "Khwisero": ["Khwisero", "Kakamega", "Butere"]
          }
        },
        "Kakamega South": {
          wards: {
            "Kakamega South": ["Kakamega South", "Kakamega Town", "Shinyalu"],
            "Shinyalu": ["Shinyalu", "Kakamega", "Butere"],
            "Butere": ["Butere", "Kakamega", "Shinyalu"],
            "Khwisero": ["Khwisero", "Kakamega", "Butere"]
          }
        },
        "Lugari": {
          wards: {
            "Lugari": ["Lugari", "Kakamega Town", "Shinyalu"],
            "Likuyani": ["Likuyani", "Kakamega", "Butere"],
            "Matete": ["Matete", "Kakamega", "Shinyalu"],
            "Chekalini": ["Chekalini", "Kakamega", "Butere"]
          }
        },
        "Malava": {
          wards: {
            "Malava": ["Malava", "Kakamega Town", "Shinyalu"],
            "Butali": ["Butali", "Kakamega", "Butere"],
            "Chegulo": ["Chegulo", "Kakamega", "Shinyalu"],
            "Mugai": ["Mugai", "Kakamega", "Butere"]
          }
        }
      }
    },
    "Bungoma": {
      subCounties: {
        "Bungoma Central": {
          wards: {
            "Bungoma Central": ["Bungoma Central", "Bungoma Town", "Webuye"],
            "Webuye": ["Webuye", "Bungoma", "Kimilili"],
            "Kimilili": ["Kimilili", "Bungoma", "Webuye"],
            "Bumula": ["Bumula", "Bungoma", "Kimilili"]
          }
        },
        "Bungoma East": {
          wards: {
            "Bungoma East": ["Bungoma East", "Bungoma Town", "Webuye"],
            "Webuye": ["Webuye", "Bungoma", "Kimilili"],
            "Kimilili": ["Kimilili", "Bungoma", "Webuye"],
            "Bumula": ["Bumula", "Bungoma", "Kimilili"]
          }
        },
        "Bungoma North": {
          wards: {
            "Bungoma North": ["Bungoma North", "Bungoma Town", "Webuye"],
            "Webuye": ["Webuye", "Bungoma", "Kimilili"],
            "Kimilili": ["Kimilili", "Bungoma", "Webuye"],
            "Bumula": ["Bumula", "Bungoma", "Kimilili"]
          }
        },
        "Bungoma South": {
          wards: {
            "Bungoma South": ["Bungoma South", "Bungoma Town", "Webuye"],
            "Webuye": ["Webuye", "Bungoma", "Kimilili"],
            "Kimilili": ["Kimilili", "Bungoma", "Webuye"],
            "Bumula": ["Bumula", "Bungoma", "Kimilili"]
          }
        },
        "Bungoma West": {
          wards: {
            "Bungoma West": ["Bungoma West", "Bungoma Town", "Webuye"],
            "Webuye": ["Webuye", "Bungoma", "Kimilili"],
            "Kimilili": ["Kimilili", "Bungoma", "Webuye"],
            "Bumula": ["Bumula", "Bungoma", "Kimilili"]
          }
        },
        "Mt Elgon": {
          wards: {
            "Mt Elgon": ["Mt Elgon", "Bungoma Town", "Webuye"],
            "Cheptais": ["Cheptais", "Bungoma", "Kimilili"],
            "Kapsokwony": ["Kapsokwony", "Bungoma", "Webuye"],
            "Kopsiro": ["Kopsiro", "Bungoma", "Kimilili"]
          }
        }
      }
    },
    "Kiambu": {
      subCounties: {
        "Kiambu": {
          wards: {
            "Kiambu": ["Kiambu Town", "Kiambu", "Githunguri"],
            "Githunguri": ["Githunguri", "Kiambu", "Ruiru"],
            "Ruiru": ["Ruiru", "Kiambu", "Thika"],
            "Thika": ["Thika", "Kiambu", "Githunguri"]
          }
        },
        "Limuru": {
          wards: {
            "Limuru": ["Limuru", "Kiambu", "Githunguri"],
            "Tigoni": ["Tigoni", "Kiambu", "Ruiru"],
            "Kijabe": ["Kijabe", "Kiambu", "Thika"],
            "Ngecha": ["Ngecha", "Kiambu", "Githunguri"]
          }
        },
        "Kabete": {
          wards: {
            "Kabete": ["Kabete", "Kiambu", "Githunguri"],
            "Uthiru": ["Uthiru", "Kiambu", "Ruiru"],
            "Kinoo": ["Kinoo", "Kiambu", "Thika"],
            "Kikuyu": ["Kikuyu", "Kiambu", "Githunguri"]
          }
        },
        "Gatundu North": {
          wards: {
            "Gatundu North": ["Gatundu North", "Kiambu", "Githunguri"],
            "Gatundu South": ["Gatundu South", "Kiambu", "Ruiru"],
            "Gatanga": ["Gatanga", "Kiambu", "Thika"],
            "Kahuro": ["Kahuro", "Kiambu", "Githunguri"]
          }
        },
        "Gatundu South": {
          wards: {
            "Gatundu South": ["Gatundu South", "Kiambu", "Githunguri"],
            "Gatundu North": ["Gatundu North", "Kiambu", "Ruiru"],
            "Gatanga": ["Gatanga", "Kiambu", "Thika"],
            "Kahuro": ["Kahuro", "Kiambu", "Githunguri"]
          }
        },
        "Juja": {
          wards: {
            "Juja": ["Juja", "Kiambu", "Githunguri"],
            "Thika": ["Thika", "Kiambu", "Ruiru"],
            "Ruiru": ["Ruiru", "Kiambu", "Thika"],
            "Gatundu": ["Gatundu", "Kiambu", "Githunguri"]
          }
        }
      }
    },
    "Meru": {
      subCounties: {
        "Meru Central": {
          wards: {
            "Meru Central": ["Meru Central", "Meru Town", "Maua"],
            "Maua": ["Maua", "Meru", "Chuka"],
            "Chuka": ["Chuka", "Meru", "Maua"],
            "Tigania": ["Tigania", "Meru", "Chuka"]
          }
        },
        "Meru North": {
          wards: {
            "Meru North": ["Meru North", "Meru Town", "Maua"],
            "Maua": ["Maua", "Meru", "Chuka"],
            "Chuka": ["Chuka", "Meru", "Maua"],
            "Tigania": ["Tigania", "Meru", "Chuka"]
          }
        },
        "Meru South": {
          wards: {
            "Meru South": ["Meru South", "Meru Town", "Maua"],
            "Maua": ["Maua", "Meru", "Chuka"],
            "Chuka": ["Chuka", "Meru", "Maua"],
            "Tigania": ["Tigania", "Meru", "Chuka"]
          }
        },
        "Imenti North": {
          wards: {
            "Imenti North": ["Imenti North", "Meru Town", "Maua"],
            "Maua": ["Maua", "Meru", "Chuka"],
            "Chuka": ["Chuka", "Meru", "Maua"],
            "Tigania": ["Tigania", "Meru", "Chuka"]
          }
        },
        "Imenti South": {
          wards: {
            "Imenti South": ["Imenti South", "Meru Town", "Maua"],
            "Maua": ["Maua", "Meru", "Chuka"],
            "Chuka": ["Chuka", "Meru", "Maua"],
            "Tigania": ["Tigania", "Meru", "Chuka"]
          }
        },
        "Tigania West": {
          wards: {
            "Tigania West": ["Tigania West", "Meru Town", "Maua"],
            "Maua": ["Maua", "Meru", "Chuka"],
            "Chuka": ["Chuka", "Meru", "Maua"],
            "Tigania": ["Tigania", "Meru", "Chuka"]
          }
        }
      }
    }
  };

  const steps = [
    { title: "Personal Details", icon: <User className="w-5 h-5" /> },
    { title: "Location", icon: <MapPin className="w-5 h-5" /> },
    { title: "Education", icon: <GraduationCap className="w-5 h-5" /> },
    { title: "Financial", icon: <DollarSign className="w-5 h-5" /> },
    { title: "Confirmation", icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const handleChange = (e) => {
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

  const nextStep = () => {
    // Validate current step before proceeding
    if (step === 0) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
          !formData.idNumber || !formData.gender || !formData.dob) {
        setError('Please fill all required fields in Personal Details');
        return;
      }
    } else if (step === 1) {
      if (!formData.county || !formData.subCounty || !formData.ward || !formData.village) {
        setError('Please fill all required fields in Location');
        return;
      }
    } else if (step === 2) {
      if (!formData.institution || !formData.course || !formData.yearOfStudy) {
        setError('Please fill all required fields in Education');
        return;
      }
    } else if (step === 3) {
      if (!formData.feeAmount || !formData.familyIncome || !formData.reason) {
        setError('Please fill all required fields in Financial Information');
        return;
      }
    }
    
    setError('');
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await apiService.createApplication(formData);
      setSuccess('Application submitted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get villages for the selected ward
  const getVillages = () => {
    if (formData.county && formData.subCounty && formData.ward) {
      return counties[formData.county].subCounties[formData.subCounty].wards[formData.ward] || [];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-grey- dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bursary Application
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete all steps to submit your bursary application
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

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-2 ${
                  step === i 
                    ? "text-indigo-600 dark:text-indigo-400" 
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${step === i ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  {s.icon}
                </div>
                <span className="text-xs font-medium mt-1">{s.title}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${(step + 1) * 20}%` }}
            ></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 0 - Personal Details */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      National ID / Birth Cert No. *
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      required
                      placeholder="National ID / Birth Cert No."
                      value={formData.idNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 1 - Location */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      County *
                    </label>
                    <select
                      name="county"
                      required
                      value={formData.county}
                      onChange={handleChange}
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
                      Sub-County *
                    </label>
                    <select
                      name="subCounty"
                      required
                      value={formData.subCounty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                      disabled={!formData.county}
                    >
                      <option value="">Select Sub-County</option>
                      {formData.county && Object.keys(counties[formData.county].subCounties).map((sc) => (
                        <option key={sc} value={sc}>{sc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ward *
                    </label>
                    <select
                      name="ward"
                      required
                      value={formData.ward}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                      disabled={!formData.subCounty}
                    >
                      <option value="">Select Ward</option>
                      {formData.subCounty && Object.keys(counties[formData.county].subCounties[formData.subCounty].wards).map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Village/Estate *
                    </label>
                    <select
                      name="village"
                      required
                      value={formData.village}
                      onChange={handleChange}
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
              </div>
            )}

            {/* Step 2 - Education */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    name="institution"
                    required
                    placeholder="Institution Name"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course *
                    </label>
                    <input
                      type="text"
                      name="course"
                      required
                      placeholder="Course Name"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year of Study *
                    </label>
                    <select
                      name="yearOfStudy"
                      required
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                      <option value="Postgraduate">Postgraduate</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Financial */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Financial Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total Fee Amount (KES) *
                    </label>
                    <input
                      type="number"
                      name="feeAmount"
                      required
                      placeholder="Total Fee Amount"
                      value={formData.feeAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monthly Family Income (KES) *
                    </label>
                    <input
                      type="number"
                      name="familyIncome"
                      required
                      placeholder="Monthly Family Income"
                      value={formData.familyIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why do you need this bursary? *
                  </label>
                  <textarea
                    name="reason"
                    required
                    rows="4"
                    placeholder="Explain why you need this bursary and how it will help you achieve your educational goals..."
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 4 - Confirmation */}
            {step === 4 && (
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Review Your Application
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Please review your details before submitting. Click "Submit Application" when ready.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white border-b pb-2">Personal Details</h4>
                    <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    <p><span className="font-medium">ID Number:</span> {formData.idNumber}</p>
                    <p><span className="font-medium">Gender:</span> {formData.gender}</p>
                    <p><span className="font-medium">Date of Birth:</span> {formData.dob}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white border-b pb-2">Location & Education</h4>
                    <p><span className="font-medium">County:</span> {formData.county}</p>
                    <p><span className="font-medium">Sub-County:</span> {formData.subCounty}</p>
                    <p><span className="font-medium">Ward:</span> {formData.ward}</p>
                    <p><span className="font-medium">Village:</span> {formData.village}</p>
                    <p><span className="font-medium">Institution:</span> {formData.institution}</p>
                    <p><span className="font-medium">Course:</span> {formData.course}</p>
                    <p><span className="font-medium">Year of Study:</span> {formData.yearOfStudy}</p>
                  </div>
                  
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white border-b pb-2">Financial Information</h4>
                    <p><span className="font-medium">Fee Amount:</span> KES {formData.feeAmount?.toLocaleString()}</p>
                    <p><span className="font-medium">Family Income:</span> KES {formData.familyIncome?.toLocaleString()}</p>
                    <p><span className="font-medium">Reason for Bursary:</span> {formData.reason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </button>
              ) : (
                <div></div>
              )}
              
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ml-auto"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;