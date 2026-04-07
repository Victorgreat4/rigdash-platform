export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          created_at: string;
          id: string;
          iso_alpha2: string | null;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          iso_alpha2?: string | null;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          iso_alpha2?: string | null;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      manufacturers: {
        Row: {
          country_id: string | null;
          created_at: string;
          id: string;
          name: string;
          slug: string;
          website: string | null;
        };
        Insert: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
          website?: string | null;
        };
        Update: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "manufacturers_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          }
        ];
      };
      cartridges: {
        Row: {
          caliber: string;
          cartridge_type: string;
          casing_material: string | null;
          country_id: string | null;
          created_at: string;
          id: string;
          manufacturer_id: string | null;
          name: string;
          notes: string | null;
          slug: string;
        };
        Insert: {
          caliber: string;
          cartridge_type: string;
          casing_material?: string | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name: string;
          notes?: string | null;
          slug: string;
        };
        Update: {
          caliber?: string;
          cartridge_type?: string;
          casing_material?: string | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name?: string;
          notes?: string | null;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cartridges_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cartridges_manufacturer_id_fkey";
            columns: ["manufacturer_id"];
            isOneToOne: false;
            referencedRelation: "manufacturers";
            referencedColumns: ["id"];
          }
        ];
      };
      ammo_variants: {
        Row: {
          cartridge_id: string;
          created_at: string;
          id: string;
          name: string;
          notes: string | null;
          relative_damage: string | null;
          relative_penetration: string | null;
          slug: string;
          source_game: string;
          variant_type: string;
        };
        Insert: {
          cartridge_id: string;
          created_at?: string;
          id?: string;
          name: string;
          notes?: string | null;
          relative_damage?: string | null;
          relative_penetration?: string | null;
          slug: string;
          source_game: string;
          variant_type: string;
        };
        Update: {
          cartridge_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          notes?: string | null;
          relative_damage?: string | null;
          relative_penetration?: string | null;
          slug?: string;
          source_game?: string;
          variant_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ammo_variants_cartridge_id_fkey";
            columns: ["cartridge_id"];
            isOneToOne: false;
            referencedRelation: "cartridges";
            referencedColumns: ["id"];
          }
        ];
      };
      learning_path_items: {
        Row: {
          cartridge_id: string | null;
          created_at: string;
          description: string | null;
          entry_type: string;
          id: string;
          learning_path_id: string;
          item_order: number;
          title_override: string | null;
          weapon_id: string | null;
        };
        Insert: {
          cartridge_id?: string | null;
          created_at?: string;
          description?: string | null;
          entry_type: string;
          id?: string;
          learning_path_id: string;
          item_order: number;
          title_override?: string | null;
          weapon_id?: string | null;
        };
        Update: {
          cartridge_id?: string | null;
          created_at?: string;
          description?: string | null;
          entry_type?: string;
          id?: string;
          learning_path_id?: string;
          item_order?: number;
          title_override?: string | null;
          weapon_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "learning_path_items_cartridge_id_fkey";
            columns: ["cartridge_id"];
            isOneToOne: false;
            referencedRelation: "cartridges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "learning_path_items_learning_path_id_fkey";
            columns: ["learning_path_id"];
            isOneToOne: false;
            referencedRelation: "learning_paths";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "learning_path_items_weapon_id_fkey";
            columns: ["weapon_id"];
            isOneToOne: false;
            referencedRelation: "weapons";
            referencedColumns: ["id"];
          }
        ];
      };
      learning_paths: {
        Row: {
          created_at: string;
          description: string;
          estimated_minutes: number | null;
          id: string;
          level: string;
          slug: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          estimated_minutes?: number | null;
          id?: string;
          level?: string;
          slug: string;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          estimated_minutes?: number | null;
          id?: string;
          level?: string;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_path: string | null;
          id: string;
          username: string;
        };
        Insert: {
          avatar_path?: string | null;
          id: string;
          username: string;
        };
        Update: {
          avatar_path?: string | null;
          id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      study_progress: {
        Row: {
          cartridge_id: string | null;
          created_at: string;
          entry_type: string;
          id: string;
          learned_at: string | null;
          updated_at: string;
          user_id: string;
          weapon_id: string | null;
        };
        Insert: {
          cartridge_id?: string | null;
          created_at?: string;
          entry_type: string;
          id?: string;
          learned_at?: string | null;
          updated_at?: string;
          user_id: string;
          weapon_id?: string | null;
        };
        Update: {
          cartridge_id?: string | null;
          created_at?: string;
          entry_type?: string;
          id?: string;
          learned_at?: string | null;
          updated_at?: string;
          user_id?: string;
          weapon_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "study_progress_cartridge_id_fkey";
            columns: ["cartridge_id"];
            isOneToOne: false;
            referencedRelation: "cartridges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "study_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "study_progress_weapon_id_fkey";
            columns: ["weapon_id"];
            isOneToOne: false;
            referencedRelation: "weapons";
            referencedColumns: ["id"];
          }
        ];
      };
      weapons: {
        Row: {
          action_type: string | null;
          barrel_length_mm: number | null;
          country_id: string | null;
          created_at: string;
          id: string;
          manufacturer_id: string | null;
          name: string;
          notes: string | null;
          platform: string | null;
          slug: string;
          weapon_type: string;
        };
        Insert: {
          action_type?: string | null;
          barrel_length_mm?: number | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name: string;
          notes?: string | null;
          platform?: string | null;
          slug: string;
          weapon_type: string;
        };
        Update: {
          action_type?: string | null;
          barrel_length_mm?: number | null;
          country_id?: string | null;
          created_at?: string;
          id?: string;
          manufacturer_id?: string | null;
          name?: string;
          notes?: string | null;
          platform?: string | null;
          slug?: string;
          weapon_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "weapons_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weapons_manufacturer_id_fkey";
            columns: ["manufacturer_id"];
            isOneToOne: false;
            referencedRelation: "manufacturers";
            referencedColumns: ["id"];
          }
        ];
      };
      weapon_cartridge_compatibility: {
        Row: {
          cartridge_id: string;
          compatibility_type: string;
          created_at: string;
          id: string;
          notes: string | null;
          weapon_id: string;
        };
        Insert: {
          cartridge_id: string;
          compatibility_type?: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          weapon_id: string;
        };
        Update: {
          cartridge_id?: string;
          compatibility_type?: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          weapon_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "weapon_cartridge_compatibility_cartridge_id_fkey";
            columns: ["cartridge_id"];
            isOneToOne: false;
            referencedRelation: "cartridges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weapon_cartridge_compatibility_weapon_id_fkey";
            columns: ["weapon_id"];
            isOneToOne: false;
            referencedRelation: "weapons";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
