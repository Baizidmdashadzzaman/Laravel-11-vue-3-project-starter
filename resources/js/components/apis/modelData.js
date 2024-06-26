import api from "./api";
import { onMounted, ref ,toRefs} from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default function modelData() {

    let countrydata = ref({
        name:'',
        image:'',
        status: 'active',
    });

    const initialStateData_masjid = {
        country_id:'',
        city_n_p_id:'',
        name:'',
        name_lang:'',
        slug:'',
        subtitle:'',
        subtitle_lang:'',
        logo:'',
        logo_show:'',
        address:'',
        address_lang:'',
        phone:'',
        phone_lang:'',
        email:'',
        zip_code:'',
        latitude:'',
        longitude:'',
        primary_lang_id:'',
        secondary_lang_id:'',
        admin_note:'',
        admin_note_lang:'',
        hijridateadjust:'dontaddoffset',
        screentsetting_odlst:'no',
        screentsetting_sjt:'no',
        screentsetting_mJtetfzt:'no',
        screentsetting_sttaitanat:'no',
        screentsetting_sifes:'no',
        screentsetting_simat:'no',
        screentsetting_dti12hf:'no',
        screentsetting_dsm:'no',
        screentsetting_shd:'no',
        screentsetting_ptomsbaai:'no',
        screentsetting_emst:'no',
        iqamah_minutes_to_fajr:'0',
        iqamah_minutes_to_dhuhr:'0',
        iqamah_minutes_to_asr:'0',
        iqamah_minutes_to_maghrib:'0',
        Iqamah_minutes_to_isha:'0',
        jumah_adhan_time:'',
        Minutes_to_jumah_iqamah:'0',
        display_style:'1',
        status:'active',
    };

    const initialStateData_salattime = {
        masjid_id:'',
        excel_file:'',
        salah_day:'',
        salah_month:'',
        salah_year:'',
        salah_fajr:'',
        salah_dhuhr:'',
        salah_asr:'',
        salah_magrib:'',
        salah_isha:'',
        sun_rise:'',
        sun_set:'',
        shuruq_time:'',
        status:'active',
    };

    const initialStateData_aztoken = {
        aztoken:'',
        aztoken_key:'',
        token_request:'',
        aztoken_information:'',
        status:'active',
    };

    const initialStateData_displaymessage = {
        masjid_id:'',
        title:'',
        title_lang:'',
        message_type:'text',
        event_yes_no:'no',
        start_date:'',
        expire_date:'',
        image:'',
        image_show:'',
        message:'',
        message_lang:'',
        status:'active',
    };

    const initialStateData_salattime_import = {
        masjid_id:'',
        file:'',
    };

    const initialStateData_setting = {
        site_name:'',
        logo:'',
        logo_show:'',
        logo_backend:'',
        logo_backend_show:'',
        favicon:'',
        favicon_show:'',
        email:'',
        phone:'',
        address:'',
        description:'',
        faq:'',
        aboutus:'',
        status:'active',
        seo_keyword:'',
        seo_description:'',
    };


    const initialStateData_masjid_and_user = {
        country_id:'',
        city_n_p_id:'',
        name:'',
        name_lang:'',
        slug:'',
        subtitle:'',
        subtitle_lang:'',
        logo:'',
        logo_show:'',
        address:'',
        address_lang:'',
        phone:'',
        phone_lang:'',
        email:'',
        zip_code:'',
        latitude:'',
        longitude:'',
        primary_lang_id:'',
        secondary_lang_id:'',
        admin_note:'',
        admin_note_lang:'',
        hijridateadjust:'dontaddoffset',
        screentsetting_odlst:'no',
        screentsetting_sjt:'no',
        screentsetting_mJtetfzt:'no',
        screentsetting_sttaitanat:'no',
        screentsetting_sifes:'no',
        screentsetting_simat:'no',
        screentsetting_dti12hf:'no',
        screentsetting_dsm:'no',
        screentsetting_shd:'no',
        screentsetting_ptomsbaai:'no',
        screentsetting_emst:'no',
        iqamah_minutes_to_fajr:'0',
        iqamah_minutes_to_dhuhr:'0',
        iqamah_minutes_to_asr:'0',
        iqamah_minutes_to_maghrib:'0',
        Iqamah_minutes_to_isha:'0',
        jumah_adhan_time:'',
        Minutes_to_jumah_iqamah:'0',
        display_style:'1',
        status:'active',
        masjid_id:'',
        name_user:'',
        email_user:'',
        phone_user:'',
        password:'',
        address_user:'',
        other_info:'',
        status:'active',
        prime_user:'no',
        permission:'',
        file:'',
    };


    const state_category = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_subcategory = {
        category_id:'',
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_subsubcategory = {
        category_id:'',
        subcategory_id:'',
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_bondsize = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_brand = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_color = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_cupsize = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_delivarycharge = {
        name:'',
        name_bn:'',
        price:'',
        status:'active',
    };
    const state_fabric = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_origincountry = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_pricecode = {
        number:'',
        letter:'',
    };
    const state_producttype = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };
    const state_size = {
        name:'',
        name_bn:'',
        slug:'',
        image:'',
        banner:'',
        image_show:'',
        banner_show:'',
        status:'active',
    };

    const state_customer = {
        name:'',
        code:'',
        email:'',
        phone:'',
        password:'',
        country:'',
        divison:'',
        city:'',
        address:'',
        zipcode:'',
        contactinfo:'',
        isverified:'no',
        varification_code:'',
        access_token:'',
        access_token_status:'inactive',
        status:'active',
    };

    const state_customermessage = {
        user_id:'',
        customer_id:'',
        message:'',
        file:'',
        notified:'no',
        status:'active',
    };
    const state_product = {
        category_id:'',
        subcategory_id:'',
        subsubcategory_id:'',
        brand_id:'',
        producttype_id:'',
        origincountry_id:'',
        name:'',
        name_bn:'',
        slug:'',
        shortdescription:'',
        shortdescription_bn:'',
        description:'',
        description_bn:'',
        code:'',
        code_custom:'',
        barcode:'',
        image:'',
        image_sec:'',
        image_show:'',
        image_sec_show:'',
        original_price:'',
        price:'',
        sell_price:'',
        variable_product:'no',
        stock:'',
        discount_status:'no',
        discount_information:'',
        before_discount_price:'0',
        product_featured:'no',
        has_bond_cup:'no',
        status:'active',
    };
    const state_productreview = {
        product_id:'',
        customer_id:'',
        review:'',
        rating:'5',
        status:'active',
    };
    const state_productstock = {
        product_id:'',
        color_id:'',
        size_id:'',
        bondsize_id:'',
        cupsize_id:'',
        stock:'0',
        status:'active',
    };
    const state_productwishlist = {
        product_id:'',
        customer_id:'',
        status:'active',
    };
    const state_order = {
        id: '',
        sales_type:'sales',
        invoice_key:'',
        sales_number:'',
        admin_id:'',
        session_id:'',
        customer_id:'',
        sales_date:'',
        admin_approval:'no',
        other_information:'',
        status:'active',
        sub_total:'0',
        discount_percent:'0',
        discount_type:'money',
        discount_amount:'0',
        vat_percent:'0',
        vat_amount:'0',
        delivarycharge_id:'',
        delivarycharge_amount:'0',
        total_amount:'0',
        paid_amount:'0',
        remaining_amount:'0',
        product_purchase_total:'0',
        product_sold_total:'0',
        purchase_return_status:'no',
        product_purchase_r_total:'0',
        product_sold_r_total:'0',
        profit_total:'0',
        customer_name:'',
        customer_phone:'',
        customer_email:'',
        customer_country:'',
        customer_divison:'',
        customer_city:'',
        customer_address:'',
        customer_zipcode:'',
        payment_type:'cash-on-delivary',
    };
    const state_orderproduct = {
        id: '',
        sales_type: 'sales_cart',
        sales_id: '',
        session_id: '',
        customer_id: '',
        product_id: '',
        name: '',
        slug: '',
        code: '',
        image: '',
        original_price: 0,
        price: 0,
        sell_price: 0,
        sales_quantity: 0,
        sales_quantity_return: 0,
        sales_price: 0,
        sub_total: 0,
        discount_percent: 0,
        discount_type: 'money',
        discount_amount: 0,
        total_amount_return: 0,
        total_amount: 0,
        color_id:'',
        size_id:'',
        bondsize_id:'',
        cupsize_id:'',
    };
    const state_productsearch = {
        category_id:'',
        subcategory_id:'',
        subsubcategory_id:'',
        brand_id:'',
        producttype_id:'',
        origincountry_id:'',
        name:'',
        code:'',
        code_custom:'',
        barcode:'',
    };

    const state_role = {
        name:'',
        status:'active',
    };
    const state_permission = {
        name:'',
        status:'active',
    };

    const state_admin = {
        id:'',
        name:'',
        email:'',
        password:'',
        access_token:'',
        access_token_status:'inactive',
        status:'active',
        role_id:'',
    };

    return {
        state_admin,

        state_role,
        state_permission,

        state_order,
        state_orderproduct,
        state_productsearch,

        state_customer,
        state_customermessage,
        state_product,
        state_productreview,
        state_productstock,
        state_productwishlist,

        state_category,
        state_subcategory,
        state_subsubcategory,
        state_bondsize,
        state_brand,
        state_color,
        state_cupsize,
        state_delivarycharge,
        state_fabric,
        state_origincountry,
        state_pricecode,
        state_producttype,
        state_size,

        countrydata,
        initialStateData_masjid,
        initialStateData_salattime,
        initialStateData_aztoken,
        initialStateData_displaymessage,
        initialStateData_salattime_import,
        initialStateData_setting,
        initialStateData_masjid_and_user
    }
}
